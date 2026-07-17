(function () {
    function effectsOf(fighter, skillIndex = 0) {
        const skill = window.HannamBallsBattle?.skillOf?.(fighter, skillIndex) || fighter.definition.skill;
        return skill?.effects || {};
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
                        target.slowUntil = now + effects.slowDuration
                            * (target.definition.crowdControlDurationMultiplier || 1)
                            * (target.raidCcDurationMultiplier || 1) * 1000;
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

            "faker": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const passiveEffects = fighter.definition.passive?.effects || {};
                const passiveExhausted = (fighter.fakerPassiveUses || 0) >= (passiveEffects.maxTriggers || 2);
                const trophyWindowOpen = fighter.lastBossTrophyAt > 0 && now - fighter.lastBossTrophyAt <= (effects.gogeonpaWindow || 6) * 1000;
                if (fighter.isBoss && passiveExhausted && trophyWindowOpen) {
                    fighter.gogeonpaUntil = now + (effects.gogeonpaDuration || 6) * 1000;
                    fighter.invulnerableUntil = Math.max(fighter.invulnerableUntil || 0, fighter.gogeonpaUntil);
                    fighter.lastBossTrophyAt = 0;
                    ctx.setVelocitySpeed(fighter, fighter.speed * (effects.gogeonpaSpeedMultiplier || 0.5));
                    ctx.effectRing(fighter.x, fighter.y, ctx.battle.arenaSize * 1.25, "#ef4444");
                    ctx.megaBurst(fighter.x, fighter.y, "#ef4444", 14);
                    ctx.floatText("고전파 모드", fighter.x, fighter.y - ctx.battle.ballSize, "#ef4444");
                    return;
                }

                const radius = Math.min(effects.radius || 255, ctx.battle.arenaSize * 0.46);
                ctx.effectRing(fighter.x, fighter.y, radius * 2, fighter.definition.color);
                ctx.burst(fighter.x, fighter.y, fighter.definition.color, 16);
                ctx.floatText("미드차이", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);

                ctx.battle.fighters.forEach((target) => {
                    if (target === fighter || target.dead || ctx.areAllies(fighter, target)) {
                        return;
                    }
                    const distance = Math.hypot(target.x - fighter.x, target.y - fighter.y);
                    if (distance <= radius) {
                        ctx.applyDamage(target, effects.damage, fighter, "skill");
                        ctx.stun(target, effects.stunSeconds, now);
                        ctx.impactStar(target.x, target.y, fighter.definition.color);
                        ctx.effectRing(target.x, target.y, ctx.battle.ballSize * 1.8, fighter.definition.color);
                    }
                });
            },

            "roh-moohyun": (fighter, now, ctx, skillIndex = 0) => {
                if (skillIndex === 1) {
                    const effects = effectsOf(fighter, 1);
                    const target = ctx.nearestEnemy(fighter);
                    if (!target || target.isMapObject) {
                        ctx.floatText("NO TARGET", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                        return;
                    }

                    const dir = ctx.normalize(fighter.vx || 1, fighter.vy || 0);
                    const pullDistance = ctx.battle.ballSize * 1.15;
                    target.x = Math.max(
                        ctx.battle.ballSize / 2,
                        Math.min(ctx.battle.arenaSize - ctx.battle.ballSize / 2, fighter.x + dir.x * pullDistance)
                    );
                    target.y = Math.max(
                        ctx.battle.ballSize / 2,
                        Math.min(ctx.battle.arenaSize - ctx.battle.ballSize / 2, fighter.y + dir.y * pullDistance)
                    );
                    target.vx = 0;
                    target.vy = 0;
                    ctx.effectRing(fighter.x, fighter.y, ctx.battle.ballSize * 2.2, fighter.definition.color);
                    ctx.megaBurst(target.x, target.y, "#facc15", 10);
                    ctx.floatText("운지!", target.x, target.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    if (ctx.effects?.unjiDrop) {
                        ctx.effects.unjiDrop(target.x, target.y, fighter.definition.color);
                    }

                    // 피해를 먼저 적용한 뒤 추락(맵 밖) 연출 — offMap 중이면 피해가 무시됨
                    const dealt = ctx.applyMaxHpRatioDamage(target, effects.maxHpDamageRatio || 0.2009, fighter, "skill");
                    if (target.dead) {
                        ctx.healFighter(fighter, fighter.maxHp * (effects.killHealRatio || 0.2009));
                        fighter.shield = (fighter.shield || 0) + fighter.maxHp * (effects.killShieldRatio || 0.523);
                        ctx.floatText("운지 처치 회복", fighter.x, fighter.y - ctx.battle.ballSize, "#4ade80");
                        ctx.megaBurst(fighter.x, fighter.y, "#4ade80", 8);
                    } else {
                        target.offMapUntil = now + (effects.offMapDuration || 2.09) * 1000;
                        if (dealt > 0) {
                            ctx.floatText("추락!", target.x, target.y - ctx.battle.ballSize / 2, "#ba1a1a");
                        }
                    }
                    return;
                }

                const summonDefinition = fighter.definition.skill.effects.summon;
                ctx.effects.summonPortal(fighter.x, fighter.y, fighter.definition.color);
                const summon = ctx.summonFighter(fighter, summonDefinition, now, {
                    label: "부엉이 소환",
                    idPrefix: "owl"
                });
                if (summon) {
                    ctx.floatText("부엉이!", summon.x, summon.y - ctx.battle.ballSize / 2, summon.definition.color);
                }
            },

            "roh-owl": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                if (ctx.fireRock) {
                    ctx.fireRock(fighter, now, effects);
                }
            },

            "yang-taehoon": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const passiveEffects = fighter.definition.passive?.effects || {};
                const poisoned = ctx.battle.fighters.filter((target) => (
                    target
                    && !target.dead
                    && !target.isMapObject
                    && target !== fighter
                    && !ctx.areAllies(fighter, target)
                    && target.taehoonPoison
                    && target.taehoonPoison.expiresAt > now
                ));

                if (poisoned.length === 0) {
                    const duration = effects.fallbackPoisonDuration || passiveEffects.poisonDuration || 5;
                    let applied = 0;
                    ctx.battle.fighters.forEach((target) => {
                        if (
                            !target
                            || target === fighter
                            || target.dead
                            || target.isMapObject
                            || ctx.areAllies(fighter, target)
                        ) {
                            return;
                        }
                        ctx.applyTaehoonPoison(target, fighter, now, duration);
                        applied += 1;
                    });
                    ctx.floatText(applied > 0 ? `독 살포 ${applied}` : "NO TARGET", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    ctx.effects?.poisonMist?.(fighter.x, fighter.y, fighter.definition.color);
                    ctx.effectRing(fighter.x, fighter.y, ctx.battle.ballSize * 2.2, fighter.definition.color);
                    return;
                }

                const healBlockSeconds = effects.healBlockSeconds || 5;
                const damageBase = effects.detonateDamageBase || 55;
                const damageCap = effects.detonateDamageMax || 300;
                poisoned.forEach((target) => {
                    const remainingMs = Math.max(1, (target.taehoonPoison?.expiresAt || now) - now);
                    target.taehoonPoison = null;
                    target.healingBlockedUntil = Math.max(target.healingBlockedUntil || 0, now + healBlockSeconds * 1000);

                    if (target.isSummon) {
                        ctx.executeFighter(target, fighter, "독 처형");
                        return;
                    }

                    // 독 연장 중첩 시 폭파 피해 폭주 방지 — 최대 300
                    const rawDamage = (Math.log10(remainingMs) ** 2) / Math.log10(100) * damageBase;
                    const damage = Math.min(damageCap, rawDamage);
                    ctx.applyDamage(target, damage, fighter, "skill");
                    ctx.floatText(`독폭파 ${Math.round(damage)}`, target.x, target.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    ctx.megaBurst(target.x, target.y, fighter.definition.color, 8);
                    ctx.impactStar(target.x, target.y, "#a855f7");
                    ctx.floatText("치유 불가", target.x, target.y - ctx.battle.ballSize, "#7c3aed");
                });
                ctx.effects?.poisonMist?.(fighter.x, fighter.y, fighter.definition.color);
                ctx.floatText(`독 폭파 ${poisoned.length}`, fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
            },

            "bbangki": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                fighter.bbangkiAwakenUses = (fighter.bbangkiAwakenUses || 0) + 1;
                fighter.hasteMultiplier = effects.hasteMultiplier || 1.8;
                fighter.hasteUntil = now + (effects.duration || 3) * 1000;
                fighter.tempDamageReduction = Math.max(fighter.tempDamageReduction || 0, effects.damageReduction || 0.55);
                fighter.tempDamageReductionUntil = Math.max(fighter.tempDamageReductionUntil || 0, fighter.hasteUntil);
                fighter.bbangkiCrashAt = fighter.hasteUntil;
                fighter.bbangkiCrashRatio = Math.min(
                    effects.maxRecoilRatio || 0.18,
                    (effects.recoilBaseRatio || 0.07) + (fighter.bbangkiAwakenUses - 1) * (effects.recoilGrowthRatio || 0)
                );
                ctx.setVelocitySpeed(fighter, fighter.speed * fighter.hasteMultiplier);
                ctx.effects.glitchScan(fighter.x, fighter.y, ctx.battle.ballSize * 1.7, fighter.definition.color);
                ctx.effects.dustKick(fighter.x, fighter.y, fighter.definition.color);
                ctx.effectRing(fighter.x, fighter.y, ctx.battle.ballSize * 1.8, fighter.definition.color);
                ctx.burst(fighter.x, fighter.y, fighter.definition.color, 10);
                ctx.floatText(`ㅃ키각성 ${fighter.bbangkiAwakenUses}`, fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
            },

            "mun-hyunho": (fighter, now, ctx) => {
                const effects = effectsOf(fighter);
                const center = ctx.battle.arenaSize / 2;
                const durationMs = (effects.duration || 5) * 1000;
                fighter.x = center;
                fighter.y = center;
                fighter.vx = 0;
                fighter.vy = 0;
                fighter.centerLockUntil = now + durationMs;
                fighter.mukbangUntil = fighter.centerLockUntil;
                fighter.mukbangResolved = false;
                fighter.mukbangStealRatio = effects.currentHpStealRatio || 0.5;
                fighter.mukbangFailRatio = effects.failSelfDamageRatio || 0.075;
                fighter.tempDamageReduction = Math.max(fighter.tempDamageReduction || 0, effects.damageReduction || 0.75);
                fighter.tempDamageReductionUntil = Math.max(fighter.tempDamageReductionUntil || 0, fighter.mukbangUntil);
                ctx.effectRing(center, center, ctx.battle.ballSize * 2.2, fighter.definition.color);
                ctx.effectRing(center, center, ctx.battle.arenaSize * 0.46, fighter.definition.color);
                ctx.burst(center, center, fighter.definition.color, 12);
                ctx.floatText("먹방 대기", center, center - ctx.battle.ballSize / 2, fighter.definition.color);
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
                onEnemyCollision(fighter, other, now, ctx) {
                    const effects = fighter.definition.passive.effects || {};
                    if (!fighter.shieldBreakHits) fighter.shieldBreakHits = new Map();
                    const lastShieldBreak = fighter.shieldBreakHits.get(other.id) || 0;
                    if (other.shield > 0 && now - lastShieldBreak > 620) {
                        const broken = other.shield * (effects.shieldBreakRatio || 0.5);
                        other.shield = Math.max(0, other.shield - broken);
                        fighter.shieldBreakHits.set(other.id, now);
                        ctx.floatText(`쨍그랑 -${Math.round(broken)}`, other.x, other.y - ctx.battle.ballSize / 2, "#38bdf8");
                        ctx.megaBurst(other.x, other.y, "#38bdf8", 5);
                    }
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
            },
            "mun-hyunho": {
                onEnemyCollision(fighter, other, now, ctx) {
                    if (!fighter.mukbangUntil || now > fighter.mukbangUntil || fighter.mukbangResolved || other.dead) {
                        return;
                    }

                    const effects = fighter.definition.skill.effects || {};
                    fighter.mukbangTargetId = other.id;
                    const dealt = ctx.applyCurrentHpRatioDamage(other, effects.currentHpStealRatio || 0.5, fighter, "skill");
                    fighter.mukbangResolved = true;
                    fighter.mukbangStealRatio = 0;
                    fighter.mukbangFailRatio = 0;
                    if (!other.dead) {
                        other.swallowedById = fighter.id;
                        other.swallowedHideAt = now + 450;
                        other.swallowedUntil = fighter.centerLockUntil;
                        other.invulnerableUntil = fighter.centerLockUntil;
                        other.vx = 0;
                        other.vy = 0;
                    }
                    ctx.healFighter(fighter, dealt);
                    ctx.floatText("먹방 성공", fighter.x, fighter.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    ctx.floatText("냠", other.x, other.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    ctx.megaBurst(other.x, other.y, fighter.definition.color, 8);
                    ctx.effectRing(other.x, other.y, ctx.battle.ballSize * 1.9, fighter.definition.color);
                }
            },
            "faker": {
                onEnemyCollision(fighter, other, now, ctx) {
                    if (fighter.gogeonpaUntil > now && !other.dead) {
                        ctx.executeFighter(other, fighter, "고전파 처형");
                    }
                }
            },
            "roh-moohyun": {
                onEnemyCollision(fighter, other, now, ctx) {
                    if (other.dead || other.isMapObject) {
                        return;
                    }

                    if (!fighter.rohMarkHits) {
                        fighter.rohMarkHits = new Map();
                    }
                    const lastHit = fighter.rohMarkHits.get(other.id) || 0;
                    if (now - lastHit < 620) {
                        return;
                    }
                    fighter.rohMarkHits.set(other.id, now);

                    if (!other.rohMarks) {
                        other.rohMarks = new Set();
                    }

                    const effects = fighter.definition.passive?.effects || {};
                    if (other.rohMarks.has(fighter.id)) {
                        other.rohMarks.delete(fighter.id);
                        ctx.applyDamage(other, effects.markBonusDamage || 52.3, fighter, "passive");
                        ctx.stun(other, effects.markStunSeconds || 2.09, now);
                        ctx.floatText("부끄러운 줄!", other.x, other.y - ctx.battle.ballSize / 2, fighter.definition.color);
                        ctx.impactStar(other.x, other.y, fighter.definition.color);
                        ctx.megaBurst(other.x, other.y, "#facc15", 6);
                    } else {
                        other.rohMarks.add(fighter.id);
                        ctx.floatText("표식", other.x, other.y - ctx.battle.ballSize / 2, fighter.definition.color);
                        ctx.effectRing(other.x, other.y, ctx.battle.ballSize * 1.25, fighter.definition.color);
                    }
                }
            },
            "yang-taehoon": {
                onEnemyCollision(fighter, other, now, ctx) {
                    if (other.dead || other.isMapObject || fighter.dead) {
                        return;
                    }

                    const effects = fighter.definition.passive?.effects || {};
                    if (!fighter.taehoonCollideAt) {
                        fighter.taehoonCollideAt = new Map();
                    }
                    const lastHit = fighter.taehoonCollideAt.get(other.id) || 0;
                    if (now - lastHit < (effects.collideCooldownMs || 620)) {
                        return;
                    }
                    fighter.taehoonCollideAt.set(other.id, now);

                    // 머뭇거리기: 자신 0.5초 정지
                    ctx.stun(fighter, effects.hesitateSeconds || 0.5, now);
                    ctx.applyTaehoonPoison(other, fighter, now, effects.poisonDuration || 5);
                    ctx.floatText("머뭇… 독", other.x, other.y - ctx.battle.ballSize / 2, fighter.definition.color);
                    ctx.effectRing(other.x, other.y, ctx.battle.ballSize * 1.2, fighter.definition.color);
                    ctx.effects?.poisonMist?.(other.x, other.y, fighter.definition.color);
                }
            }
        };

        function skillStartBurstCount(fighter) {
            return fighter.definition.id === "lee-seunghyun" ? 4 : 8;
        }

        function useSkill(fighter, now, skillIndex = 0) {
            const ctx = getContext();
            const skill = window.HannamBallsBattle.skillOf(fighter, skillIndex) || fighter.definition.skill;
            if (!skill) {
                return;
            }

            // 맵 오브젝트·더미 스킬은 시전하지 않음
            if (fighter.isMapObject || skill.cooldown >= 900) {
                if (fighter.skillCooldowns) {
                    fighter.skillCooldowns[skillIndex] = skill.cooldown;
                }
                if (skillIndex === 0) {
                    fighter.skillCooldown = skill.cooldown;
                }
                return;
            }

            ctx.skillLabel(skill.name, fighter);
            ctx.screenFlash(fighter.definition.color);
            ctx.megaBurst(fighter.x, fighter.y, fighter.definition.color, skillStartBurstCount(fighter));

            const handler = skillHandlers[fighter.definition.id];
            if (handler) {
                handler(fighter, now, ctx, skillIndex, skill);
            }

            const duration = ctx.skillCooldownDuration(fighter, skillIndex);
            if (!fighter.skillCooldowns) {
                const skills = window.HannamBallsBattle.getSkills(fighter.definition);
                fighter.skillCooldowns = skills.map((item, index) => (
                    index === skillIndex ? duration : ctx.skillCooldownDuration(fighter, index)
                ));
            } else {
                fighter.skillCooldowns[skillIndex] = duration;
            }
            if (skillIndex === 0) {
                fighter.skillCooldown = duration;
            }
        }

        function onEnemyCollision(fighter, other, now) {
            const ctx = getContext();
            passiveHandlers[fighter.definition.id]?.onEnemyCollision?.(fighter, other, now, ctx);
        }

        function onKill(source, target) {
            if (!source) {
                return;
            }

            const ctx = getContext();
            if (source.definition.id === "mun-hyunho" && source.mukbangTargetId === target.id) {
                source.maxHp += 20;
                source.hp = Math.min(source.maxHp, source.hp + 20);
                source.attack += 2;
                source.statBonusAttack += 2;
                source.speed = Math.max(0, source.speed - 10);
                source.statBonusSpeedRatio = source.baseSpeed > 0 ? source.speed / source.baseSpeed - 1 : 0;
                ctx.setVelocitySpeed(source, source.speed);
                ctx.floatText("먹방 성장 HP+20 ATK+2", source.x, source.y - ctx.battle.ballSize, source.definition.color);
            }
            passiveHandlers[source.definition.id]?.onKill?.(source, target, ctx);
        }

        function onBasicHit(attacker, defender, dealt, now) {
            if (!attacker || !defender || dealt <= 0) {
                return;
            }

            if (attacker.definition.id === "mun-hyunho") {
                const ctx = getContext();
                if (attacker.consumedTasteMarks?.delete(defender.id)) {
                    ctx.floatText("맛보기 폭발!", defender.x, defender.y - ctx.battle.ballSize / 2, attacker.definition.color);
                    return;
                }
                if (!defender.tasteMarks) {
                    defender.tasteMarks = new Set();
                }
                defender.tasteMarks.add(attacker.id);
                ctx.floatText("맛보기 표식", defender.x, defender.y - ctx.battle.ballSize / 2, attacker.definition.color);
            }
        }

        function basicBonusDamage(attacker, defender) {
            const effects = attacker.definition.passive?.effects || {};
            let bonus = Math.max(0, defender.hp * (effects.basicCurrentHpBonusRatio || 0));
            if (attacker.definition.id === "mun-hyunho" && defender.tasteMarks?.has(attacker.id)) {
                bonus += attacker.definition.baseAttack * (effects.markedBasicBonusMultiplier || 3);
                defender.tasteMarks.delete(attacker.id);
                if (!attacker.consumedTasteMarks) attacker.consumedTasteMarks = new Set();
                attacker.consumedTasteMarks.add(defender.id);
            }
            return bonus;
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
            if (target.definition.id === "faker" && target.hp - damageToHp <= 0) {
                const ctx = getContext();
                const effects = target.definition.passive?.effects || {};
                const uses = target.fakerPassiveUses || 0;
                if (uses < (effects.maxTriggers || 2)) {
                    target.fakerPassiveUses = uses + 1;
                    target.hp = Math.max(1, target.maxHp * (effects.reviveHpRatio || 0.88848));
                    target.shield = (target.shield || 0) + target.maxHp * (effects.shieldRatio || 0.1557);
                    target.attack += effects.attackGain || 15.57;
                    target.statBonusAttack += effects.attackGain || 15.57;
                    target.skillCooldown = Math.max(0, target.skillCooldown - (effects.cooldownReduction || 2.5));
                    ctx.floatText(`불사대마왕 ${target.fakerPassiveUses}/2`, target.x, target.y - ctx.battle.ballSize / 2, target.definition.color);
                    ctx.megaBurst(target.x, target.y, target.definition.color, 10);
                    return 0;
                }
            }

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
            onBasicHit,
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
