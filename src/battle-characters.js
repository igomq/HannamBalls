(function () {
    function effectsOf(fighter) {
        return fighter.definition.skill.effects || {};
    }

    function createModules(getContext) {
        const skillHandlers = {
            "song-geonuk": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                fighter.dietUses += 1;
                const lost = Math.max(1, fighter.hp * effects.hpCostRatio);
                fighter.hp = Math.max(1, fighter.hp - lost);
                fighter.attack += effects.attackGain;
                fighter.statBonusAttack += effects.attackGain;
                fighter.speed *= effects.speedMultiplier;
                fighter.statBonusSpeedRatio = fighter.speed / fighter.baseSpeed - 1;
                ctx.addDamageReduction(fighter, effects.damageReductionGain || 0, effects.maxDamageReduction || 0);
                ctx.setVelocitySpeed(fighter, fighter.speed);
                ctx.effectRing(fighter.x, fighter.y, ctx.battle.ballSize * 1.55, fighter.definition.color);
                ctx.burst(fighter.x, fighter.y, "#4ade80", 8);
                ctx.effects.dietAura(fighter);
                ctx.floatText(`ATK+${effects.attackGain} DEF+`, fighter.x, fighter.y, "#006d36");
            },

            "yoo-seungchan": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const radius = Math.min(effects.radius, ctx.battle.arenaSize * 0.38);
                ctx.effectRing(fighter.x, fighter.y, radius * 2, fighter.definition.color);
                ctx.effects.groundSlam(fighter.x, fighter.y, radius, fighter.definition.color);
                ctx.burst(fighter.x, fighter.y, fighter.definition.color, 10);
                ctx.battle.fighters.forEach((target) => {
                    if (target === fighter || target.dead || ctx.areAllies(fighter, target)) {
                        return;
                    }

                    const dx = target.x - fighter.x;
                    const dy = target.y - fighter.y;
                    if (Math.sqrt(dx * dx + dy * dy) <= radius) {
                        ctx.applyDamage(target, effects.damage, fighter, "skill");
                        ctx.stun(target, effects.stunSeconds, now);
                    }
                });
            },

            "han-yejun": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const ice = ctx.createIceZone(fighter, now, effects);
                ctx.effectRing(ctx.battle.arenaSize / 2, ctx.battle.arenaSize / 2, ctx.battle.arenaSize * 1.2, fighter.definition.color);
                ctx.effects.iceCrystals(ctx.battle.arenaSize / 2, ctx.battle.arenaSize / 2, 10, fighter.definition.color);
                ctx.burst(ctx.battle.arenaSize / 2, ctx.battle.arenaSize / 2, fighter.definition.color, 12);
                ctx.battle.fighters.forEach((target) => {
                    if (target !== fighter && !target.dead && !ctx.areAllies(fighter, target)) {
                        ctx.applyDamage(target, effects.damage, fighter, "skill");
                        ctx.stun(target, effects.stunSeconds, now);
                        if (ctx.isInsideIceZone(target, ice)) {
                            const bonus = ctx.applyDamage(target, effects.damage * effects.iceZoneBonusRatio, fighter, "skill");
                            ctx.healFighter(fighter, bonus * effects.iceZoneHealRatio);
                            ctx.floatText("얼음추가", target.x, target.y - ctx.battle.ballSize, fighter.definition.color);
                        }
                    }
                });
            },

            "jeong-yuseung": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const target = ctx.highestCurrentHpEnemy(fighter);
                if (!target) {
                    ctx.floatText("NO TARGET", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    return;
                }

                const dealt = ctx.applyMaxHpRatioDamage(target, effects.maxHpDamageRatio || effects.currentHpDamageRatio, fighter, "skill");
                ctx.healFighter(fighter, dealt * (effects.healRatio || 0));
                ctx.effectRing(target.x, target.y, ctx.battle.ballSize * 1.55, fighter.definition.color);
                ctx.burst(target.x, target.y, fighter.definition.color, 6);
                ctx.impactStar(target.x, target.y, fighter.definition.color);
                ctx.floatText("음식 남김", target.x, target.y - ctx.battle.ballSize / 2, fighter.definition.color);
            },

            "lee-woochan": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                fighter.chargeUntil = now + effects.durationMs;
                fighter.chargeHits = new Set();
                ctx.setVelocitySpeed(fighter, Math.max(effects.minSpeed, fighter.speed * effects.speedMultiplier));
                ctx.effectRing(fighter.x, fighter.y, ctx.battle.ballSize * 1.4, fighter.definition.color);
                ctx.burst(fighter.x, fighter.y, fighter.definition.color, 8);
                ctx.effects.chargeGhost(fighter);
            },

            "lee-seunghyun": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const uses = fighter.seunghyunSkillUses || 0;
                const poisonEffects = {
                    ...effects,
                    poisonDps: effects.poisonDps + uses * effects.poisonDpsIncrease,
                    offMapDuration: effects.offMapDuration + uses * effects.offMapDurationIncrease
                };
                fighter.offMapUntil = now + poisonEffects.offMapDuration * 1000;
                fighter.invulnerableUntil = fighter.offMapUntil;
                fighter.vx = 0;
                fighter.vy = 0;
                ctx.createPoisonField(fighter, now, poisonEffects);
                fighter.seunghyunSkillUses += 1;
                ctx.effectRing(ctx.battle.arenaSize / 2, ctx.battle.arenaSize / 2, ctx.battle.arenaSize * 1.35, fighter.definition.color);
                ctx.effects.poisonMist(ctx.battle.arenaSize / 2, ctx.battle.arenaSize / 2, fighter.definition.color);
                ctx.burst(ctx.battle.arenaSize / 2, ctx.battle.arenaSize / 2, fighter.definition.color, 6);
                ctx.floatText(`MAP OUT ${poisonEffects.poisonDps}/s`, fighter.x, fighter.y, fighter.definition.color);
            },

            "lee-hyunwoo": (fighter, now, ctx) => {
                const summonDefinition = fighter.definition.skill.effects.summon;
                ctx.effects.summonPortal(fighter.x, fighter.y, fighter.definition.color);
                ctx.summonFighter(fighter, summonDefinition, now);
            },

            "lee-jihoon": (fighter, now, ctx) => {
                const target = ctx.nearestEnemy(fighter);
                if (!target) {
                    ctx.floatText("NO TARGET", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    return;
                }

                const effects = effectsOf(fighter);
                fighter.followTargetId = target.id;
                fighter.followUntil = now + effects.duration * 1000;
                fighter.nextFollowDamageAt = now + (effects.tickInterval || 1) * 1000;
                fighter.followEffects = effects;
                if (fighter.charmedBy) {
                    fighter.followCharmedBy = fighter.charmedBy;
                }
                ctx.effects.heartChase(fighter.x, fighter.y, target.x, target.y, fighter.definition.color);
                ctx.floatText("💕LOCK ON", target.x, target.y - ctx.battle.ballSize / 2, fighter.definition.color);
                ctx.effectRing(target.x, target.y, ctx.battle.ballSize * 1.35, fighter.definition.color);
            },

            "heo-yul": (fighter, now, ctx) => {
                const target = ctx.nearestEnemy(fighter);
                const effects = effectsOf(fighter);
                fighter.tempDamageReduction = effects.damageReduction;
                fighter.tempDamageReductionUntil = now + effects.damageReductionDuration * 1000;
                fighter.speed = Math.max(40, fighter.speed - effects.speedLoss);
                fighter.statBonusSpeedRatio = fighter.speed / fighter.baseSpeed - 1;
                ctx.effects.glitchScan(fighter.x, fighter.y, ctx.battle.ballSize * 1.5, fighter.definition.color);
                ctx.applyCopiedSkill(fighter, target, now);
                ctx.floatText("🔀공부지능 ON", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
            },

            "heo-jaemin": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const radius = Math.min(effects.radius, ctx.battle.arenaSize * 0.4);
                fighter.hasteMultiplier = effects.hasteMultiplier;
                fighter.hasteUntil = now + effects.hasteDuration * 1000;
                ctx.effectRing(fighter.x, fighter.y, radius * 2, fighter.definition.color);
                ctx.effects.cloudPuff(fighter.x, fighter.y, radius, fighter.definition.color);
                ctx.burst(fighter.x, fighter.y, fighter.definition.color, 8);
                ctx.floatText("☁️구름가속", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);

                let dealt = 0;
                ctx.battle.fighters.forEach((target) => {
                    if (target === fighter || target.dead || ctx.areAllies(fighter, target)) {
                        return;
                    }
                    const dx = target.x - fighter.x;
                    const dy = target.y - fighter.y;
                    if (Math.sqrt(dx * dx + dy * dy) <= radius) {
                        target.slowMultiplier = effects.slowMultiplier;
                        target.slowUntil = now + effects.slowDuration * 1000;
                        dealt += ctx.applyDamage(target, effects.damage, fighter, "skill");
                        ctx.floatText("🌀느려짐", target.x, target.y - ctx.battle.ballSize / 2, fighter.definition.color);
                        ctx.effects.slowSpiral(target.x, target.y, fighter.definition.color);
                        ctx.impactStar(target.x, target.y, fighter.definition.color);
                        ctx.effectRing(target.x, target.y, ctx.battle.ballSize * 1.25, fighter.definition.color);
                    }
                });

                ctx.healFighter(fighter, dealt * effects.healRatio);
            },

            "kim-junmo": (fighter, now, ctx) => {
                fighter.skillUseCount += 1;
                if (fighter.skillUseCount >= fighter.definition.passive.effects.selfOutOnSkillUse) {
                    fighter.dead = true;
                    fighter.hp = 0;
                    fighter.vx = 0;
                    fighter.vy = 0;
                    ctx.floatText("셀프연행", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    ctx.megaBurst(fighter.x, fighter.y, fighter.definition.color, 6);
                    return;
                }

                const target = ctx.nearestEnemy(fighter);
                if (target) {
                    const effects = effectsOf(fighter);
                    ctx.applyDamage(target, effects.damage, fighter, "skill");
                    ctx.stun(target, effects.stunSeconds, now);
                    ctx.effects.sirenFlash(target.x, target.y);
                    ctx.effectRing(target.x, target.y, ctx.battle.ballSize * 1.85, fighter.definition.color);
                    ctx.burst(target.x, target.y, fighter.definition.color, 7);
                    ctx.impactStar(target.x, target.y, fighter.definition.color);
                    ctx.floatText("🚨공안출동", target.x, target.y - ctx.battle.ballSize / 2, fighter.definition.color);
                }
            },

            "choi-haejin": (fighter, now, ctx) => {
                const target = ctx.randomEnemy(fighter);
                const effects = effectsOf(fighter);
                if (!target) {
                    return;
                }

                fighter.backstab = {
                    targetId: target.id,
                    returnAt: now + effects.disappearDuration * 1000,
                    damage: effects.damage,
                    behindDistance: effects.behindDistance,
                    healRatio: effects.healRatio || 0
                };
                if (fighter.charmedBy) {
                    fighter.backstabCharmedBy = fighter.charmedBy;
                }
                fighter.offMapUntil = fighter.backstab.returnAt;
                fighter.invulnerableUntil = fighter.offMapUntil;
                fighter.vx = 0;
                fighter.vy = 0;
                ctx.effects.stealthFade(fighter.x, fighter.y, fighter.definition.color);
                ctx.effectRing(fighter.x, fighter.y, ctx.battle.ballSize * 1.5, fighter.definition.color);
                ctx.burst(fighter.x, fighter.y, fighter.definition.color, 5);
                ctx.floatText("🔪사라짐", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
            },

            "kang-hyunwoo": (fighter, now, ctx) => {
                const target = ctx.nearestEnemy(fighter);
                const effects = effectsOf(fighter);
                const direction = target
                    ? ctx.normalize(fighter.x - target.x, fighter.y - target.y)
                    : ctx.normalize(Math.random() - 0.5, Math.random() - 0.5);
                const moved = ctx.dashWithFallback(fighter, direction, effects.dashDistance * ctx.arenaScale());
                if (target && !target.dead) {
                    ctx.applyDamage(target, effects.dashDamage || 15, fighter, "skill");
                    ctx.effectRing(target.x, target.y, ctx.battle.ballSize * 1.2, fighter.definition.color);
                    ctx.impactStar(target.x, target.y, fighter.definition.color);
                }
                ctx.effects.dustKick(fighter.x, fighter.y, "#a8a29e");
                ctx.megaBurst(fighter.x, fighter.y, fighter.definition.color, 4);
                ctx.effectRing(fighter.x, fighter.y, ctx.battle.ballSize * 1.35, fighter.definition.color);
                ctx.floatText(moved > 1 ? "💨호다닥" : "꿈틀", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
            },

            "lim-shingyu": (fighter, now, ctx) => {
                const target = ctx.nearestEnemy(fighter);
                if (target) {
                    ctx.plantBomb(fighter, target, now);
                    ctx.impactStar(target.x, target.y, fighter.definition.color);
                }
            },

            "kim-dongha": (fighter, now, ctx) => {
                if (fighter.charmedBy) {
                    ctx.floatText("매혹 연쇄 차단", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    return;
                }

                const target = ctx.nearestEnemy(fighter);
                if (!target) {
                    ctx.floatText("NO TARGET", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    return;
                }

                ctx.effects.heartChase(fighter.x, fighter.y, target.x, target.y, fighter.definition.color);
                ctx.floatText("💕매혹", target.x, target.y - ctx.battle.ballSize / 2, fighter.definition.color);
                ctx.effectRing(target.x, target.y, ctx.battle.ballSize * 1.5, fighter.definition.color);

                target.charmedBy = fighter;
                target.backstabCharmedBy = fighter;
                target.followCharmedBy = fighter;

                ctx.useSkill(target, now);

                target.charmedBy = null;
            }
        };

        const passiveHandlers = {
            "kim-dongha": {
                onEnemyCollision(fighter, _other, now, ctx) {
                    if (!fighter.nextFlowerZoneAt || now >= fighter.nextFlowerZoneAt) {
                        ctx.createFlowerZone(fighter, now);
                        fighter.nextFlowerZoneAt = now + (fighter.definition.passive.effects.cooldown || 2) * 1000;
                    }
                }
            },
            "choi-haejin": {
                onKill(source, _target, ctx) {
                    const effects = source.definition.passive?.effects || {};
                    ctx.healFighter(source, source.maxHp * (effects.healOnKillRatio || 0));
                    source.skillCooldown *= effects.cooldownOnKillRatio || 1;
                    ctx.floatText("막타냠", source.x, source.y - ctx.battle.ballSize / 2, source.definition.color);
                }
            }
        };

        function skillStartBurstCount(fighter) {
            return fighter.definition.id === "lee-seunghyun" ? 4 : 8;
        }

        function useSkill(fighter, now) {
            const ctx = getContext();
            ctx.skillLabel(fighter.definition.skill.name, fighter);
            ctx.screenFlash(fighter.definition.color);
            ctx.megaBurst(fighter.x, fighter.y, fighter.definition.color, skillStartBurstCount(fighter));

            const handler = skillHandlers[fighter.definition.id];
            if (handler) {
                handler(fighter, now, ctx);
            }

            fighter.skillCooldown = ctx.skillCooldownDuration(fighter);
        }

        function onEnemyCollision(fighter, other, now) {
            passiveHandlers[fighter.definition.id]?.onEnemyCollision?.(fighter, other, now, getContext());
        }

        function onKill(source, target) {
            if (!source) {
                return;
            }

            passiveHandlers[source.definition.id]?.onKill?.(source, target, getContext());
        }

        function basicBonusDamage(attacker, defender) {
            const effects = attacker.definition.passive?.effects || {};
            return Math.max(0, defender.hp * (effects.basicCurrentHpBonusRatio || 0));
        }

        function piercesBasicIgnore(attacker, defender) {
            return attacker?.definition.id === "song-geonuk"
                && attacker.dietUses >= (attacker.definition.skill.effects.pierceBasicAfterUses || Infinity)
                && (defender.definition.evadesBasic || defender.definition.immuneToBasic);
        }

        function isDotDamage(kind, source) {
            return kind === "poison" || (kind === "basic" && source?.definition.id === "lee-seunghyun");
        }

        function applyThresholdShield(target, damageToHp, now) {
            if (target.definition.id !== "lee-seunghyun"
                || target.shieldTriggered
                || target.hp - damageToHp >= target.maxHp * target.definition.shieldThresholdRatio
                || target.hp < target.maxHp * target.definition.shieldThresholdRatio) {
                return damageToHp;
            }

            const ctx = getContext();
            target.shieldTriggered = true;
            const shieldAmount = target.maxHp * target.definition.shieldRatio;
            target.shield = (target.shield || 0) + shieldAmount;
            ctx.floatText("보호막!", target.x, target.y - ctx.battle.ballSize / 2, "#38bdf8");
            ctx.megaBurst(target.x, target.y, "#38bdf8", 6);

            if (damageToHp > 0) {
                const damageToDropLimit = target.hp - target.maxHp * 0.5;
                const leftoverDamage = damageToHp - damageToDropLimit;
                const absorbed = Math.min(target.shield, leftoverDamage);
                target.shield -= absorbed;
                ctx.floatText(`ABSORB ${Math.round(absorbed)}`, target.x, target.y - ctx.battle.ballSize / 2, "#38bdf8");
                return damageToDropLimit + (leftoverDamage - absorbed);
            }

            return damageToHp;
        }

        return {
            applyThresholdShield,
            basicBonusDamage,
            isDotDamage,
            onEnemyCollision,
            onKill,
            piercesBasicIgnore,
            skillHandlers,
            useSkill
        };
    }

    window.HannamBallsCharacters = {
        createModules
    };
})();
