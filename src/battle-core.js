(function () {
    const MOBILE_QUERY = "(max-width: 768px), (pointer: coarse)";

    function isLowPowerDevice() {
        const coarseOrSmall = window.matchMedia?.(MOBILE_QUERY).matches ?? false;
        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
        const weakCpu = Number.isFinite(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4;
        return coarseOrSmall || reducedMotion || weakCpu;
    }

    function createPerformanceProfile() {
        const lowPower = isLowPowerDevice();
        const effectScale = lowPower ? 0.45 : 1;
        return {
            lowPower,
            effectScale,
            hudIntervalMs: lowPower ? 160 : 100,
            elapsedIntervalMs: 100,
            effectLimits: {
                bursts: lowPower ? 34 : 70,
                rings: lowPower ? 8 : 14,
                floatTexts: lowPower ? 10 : 18,
                stars: lowPower ? 6 : 12,
                flashes: 1,
                skillLabels: lowPower ? 5 : 10
            }
        };
    }

    function createBattleState() {
        return {
            fighters: [],
            arenaSize: 600,
            ballSize: 76,
            startedAt: 0,
            fightStartedAt: 0,
            finishedAt: 0,
            countdownSeconds: 3,
            isRunning: false,
            isFinished: false,
            lastTime: 0,
            pairHits: new Map(),
            activePuddles: [],
            activePoisons: [],
            activeBombs: [],
            activeIceZones: [],
            activeFlowerZones: []
        };
    }

    function scaledEffectCount(count, profile) {
        if (!Number.isFinite(count) || count <= 0) {
            return 0;
        }

        const scale = Number.isFinite(profile?.effectScale) ? profile.effectScale : 1;
        return Math.max(1, Math.ceil(count * scale));
    }

    function createUpdateGate(intervalMs) {
        let nextAt = 0;
        return {
            reset(now = 0) {
                nextAt = now;
            },
            shouldRun(now) {
                if (now < nextAt) {
                    return false;
                }

                nextAt = now + intervalMs;
                return true;
            }
        };
    }

    function normalize(x, y) {
        const length = Math.sqrt(x * x + y * y) || 1;
        return { x: x / length, y: y / length };
    }

    function rotateVector(x, y, radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return {
            x: x * cos - y * sin,
            y: x * sin + y * cos
        };
    }

    function distanceSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }

    function areAllies(a, b) {
        if (!a || !b) {
            return false;
        }

        return Boolean(a.ownerId && b.ownerId && a.ownerId === b.ownerId);
    }

    function isStunned(fighter, now) {
        return fighter.stunnedUntil > now;
    }

    function getSkills(definition) {
        if (!definition) {
            return [];
        }

        if (Array.isArray(definition.skills) && definition.skills.length > 0) {
            return definition.skills;
        }

        const skills = [];
        if (definition.skill) {
            skills.push(definition.skill);
        }
        if (definition.skill2) {
            skills.push(definition.skill2);
        }
        return skills;
    }

    function skillOf(fighter, skillIndex = 0) {
        const skills = getSkills(fighter?.definition);
        return skills[skillIndex] || fighter?.definition?.skill || null;
    }

    function skillCooldownDuration(fighter, skillIndex = 0) {
        const skill = skillOf(fighter, skillIndex);
        if (!skill) {
            return 999;
        }

        if (fighter.definition.id === "lee-seunghyun" && skillIndex === 0) {
            const effects = skill.effects || {};
            return skill.cooldown + (fighter.seunghyunSkillUses || 0) * (effects.cooldownIncrease || 0);
        }

        return skill.cooldown;
    }

    function livingEnemiesOf(fighters, fighter, now) {
        return fighters.filter((target) => target !== fighter
            && !target.dead
            && target.offMapUntil <= now
            && !areAllies(fighter, target));
    }

    function formatElapsed(ms) {
        const totalSeconds = Math.max(0, ms) / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds - minutes * 60;
        return `${String(minutes).padStart(2, "0")}:${seconds.toFixed(1).padStart(4, "0")}`;
    }

    window.HannamBallsBattle = {
        areAllies,
        createBattleState,
        createPerformanceProfile,
        createUpdateGate,
        distanceSquared,
        formatElapsed,
        getSkills,
        isLowPowerDevice,
        isStunned,
        livingEnemiesOf,
        normalize,
        rotateVector,
        scaledEffectCount,
        skillCooldownDuration,
        skillOf
    };
})();
