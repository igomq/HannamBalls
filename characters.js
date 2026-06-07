(function () {
    const placeholderFaces = {
        song: "GW",
        yuseung: "YS",
        hanye: "YJ",
        woochan: "WC",
        seunghyun: "SH"
    };

    window.HANNAM_BALLS_CHARACTERS = [
        {
            id: "song-geonuk",
            name: "송건욱",
            shortName: "건욱",
            maxHp: 630,
            baseAttack: 32,
            speedLabel: "느림",
            speed: 165,
            colorName: "검은색",
            color: "#111111",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.song,
            traits: ["성장형 공격력", "느린 시작"],
            skill: {
                name: "다이어트",
                cooldown: 7.5,
                description: "현재 체력의 5.5%가 감소하는 대신, 기본 공격력이 10 증가하고 이동 속도가 5% 상승하며 받는 피해가 5% 감소합니다. (최대 40%)",
                effects: {
                    hpCostRatio: 0.055,
                    attackGain: 10,
                    speedMultiplier: 1.05,
                    damageReductionGain: 0.05
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            avatarSrc: 'images/geonuk.png'
        },
        {
            id: "yoo-seungchan",
            name: "유승찬",
            shortName: "승찬",
            maxHp: 490,
            baseAttack: 24,
            speedLabel: "느림",
            speed: 165,
            colorName: "회색",
            color: "#7b7f86",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.yuseung,
            traits: ["근거리 광역기", "쿨타임 순환"],
            skill: {
                name: "쿵쾅!",
                cooldown: 6,
                description: "주변 적에게 110의 피해를 주고 1초간 행동 불가 상태로 만듭니다.",
                effects: {
                    damage: 110,
                    stunSeconds: 1,
                    radius: 190
                }
            },
            cooldownOnBasicHit: 1,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false,
            avatarSrc: 'images/seungchan.png'
        },
        {
            id: "han-yejun",
            name: "한예준",
            shortName: "예준",
            maxHp: 345,
            baseAttack: 10,
            speedLabel: "보통",
            speed: 215,
            colorName: "하늘색",
            color: "#38bdf8",
            textColor: "#001a42",
            avatarSrc: "",
            avatarText: placeholderFaces.hanye,
            traits: ["전체 빙결", "받을수록 빨라지는 스킬"],
            skill: {
                name: "아이스 에이지",
                cooldown: 12.5,
                description: "모든 적을 1초간 행동 불가 상태로 만들고 180의 피해를 입힙니다.",
                effects: {
                    damage: 180,
                    stunSeconds: 1
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false,
            avatarSrc: 'images/yejun.png'
        },
        {
            id: "lee-woochan",
            name: "이우찬",
            shortName: "우찬",
            maxHp: 315,
            baseAttack: 18,
            speedLabel: "빠름",
            speed: 275,
            colorName: "보라색",
            color: "#8127cf",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.woochan,
            traits: ["기본 공격 면역", "고속 돌진"],
            skill: {
                name: "무지성 돌진",
                cooldown: 4.8,
                description: "앞으로 매우 빠르게 돌진하면서 경로에 있는 적에게 45의 피해를 입히고 주변으로 밀쳐냅니다.",
                effects: {
                    damage: 45,
                    durationMs: 480,
                    speedMultiplier: 2.45,
                    minSpeed: 430,
                    knockback: 250
                }
            },
            cooldownOnBasicHit: 0.35,
            cooldownOnDamageTaken: 0,
            immuneToBasic: true,
            avatarSrc: 'images/woochan.png'
        },
        {
            id: "lee-seunghyun",
            name: "이승현",
            shortName: "승현",
            maxHp: 220,
            baseAttack: 22,
            speedLabel: "빠름",
            speed: 255,
            colorName: "적갈색",
            color: "#8b2f23",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.seunghyun,
            traits: ["모서리 이동", "장판 흡혈", "밀치기 면역"],
            passive: {
                name: "음침한 발자국",
                description: "항상 맵 모서리로 이동하며, 적의 밀치기 스킬에 영향을 받지 않습니다. 이동 중 2초간 지속되는 장판을 만들고, 장판 피해량의 85%만큼 체력을 회복합니다.",
                effects: {
                    puddleDamage: 22,
                    puddleDuration: 2,
                    puddleTickInterval: 0.55,
                    puddleRadius: 62,
                    puddleRadiusRatio: 0.105,
                    healRatio: 0.85,
                    dropInterval: 0.42,
                    maxActivePuddles: 5
                }
            },
            skill: {
                name: "음침 물들이기",
                cooldown: 22,
                description: "맵 밖으로 잠깐 나가 피해를 입지 않고, 맵 전역에 3초 동안 지속되는 독 장판을 깔아 모든 적에게 초당 35의 독 피해를 입힙니다. 이 독 피해는 피해 흡수 효과를 받지 않습니다.",
                effects: {
                    poisonDps: 35,
                    duration: 3,
                    offMapDuration: 3,
                    tickInterval: 0.5
                }
            },
            cooldownOnBasicHit: 0.22,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            immuneToKnockback: true,
            contactAttackDisabled: true,
            noPushCollision: true,
            movementPattern: "corners",
            avatarSrc: 'images/seunghyun.png'
        }
    ];

    window.HannamBalls = {
        getCharacters() {
            return window.HANNAM_BALLS_CHARACTERS.map((character) => JSON.parse(JSON.stringify(character)));
        },
        getCharacter(id) {
            const character = window.HANNAM_BALLS_CHARACTERS.find((item) => item.id === id);
            return character ? JSON.parse(JSON.stringify(character)) : null;
        }
    };
})();
