(function () {
    const placeholderFaces = {
        song: "GW",
        yuseung: "YS",
        hanye: "YJ",
        woochan: "WC"
    };

    window.HANNAM_BALLS_CHARACTERS = [
        {
            id: "song-geonuk",
            name: "송건욱",
            shortName: "건욱",
            maxHp: 520,
            baseAttack: 35,
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
                cooldown: 8.5,
                description: "현재 체력의 6.5%가 감소하는 대신, 기본 공격력이 10 증가하고 이동 속도가 5% 상승합니다.",
                effects: {
                    hpCostRatio: 0.065,
                    attackGain: 10,
                    speedMultiplier: 1.05
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false
        },
        {
            id: "yoo-seungchan",
            name: "유승찬",
            shortName: "승찬",
            maxHp: 410,
            baseAttack: 30,
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
                cooldown: 5,
                description: "주변 적에게 140의 피해를 주고 1초간 행동 불가 상태로 만듭니다.",
                effects: {
                    damage: 140,
                    stunSeconds: 1,
                    radius: 190
                }
            },
            cooldownOnBasicHit: 1,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false
        },
        {
            id: "han-yejun",
            name: "한예준",
            shortName: "예준",
            maxHp: 350,
            baseAttack: 15,
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
                cooldown: 12,
                description: "모든 적을 1초간 행동 불가 상태로 만들고 200의 피해를 입힙니다.",
                effects: {
                    damage: 200,
                    stunSeconds: 1
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false
        },
        {
            id: "lee-woochan",
            name: "이우찬",
            shortName: "우찬",
            maxHp: 360,
            baseAttack: 18,
            speedLabel: "빠름",
            speed: 265,
            colorName: "보라색",
            color: "#8127cf",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.woochan,
            traits: ["기본 공격 면역", "고속 돌진"],
            skill: {
                name: "무지성 돌진",
                cooldown: 4.8,
                description: "앞으로 매우 빠르게 돌진하면서 경로에 있는 적에게 55의 피해를 입히고 주변으로 밀쳐냅니다.",
                effects: {
                    damage: 55,
                    durationMs: 480,
                    speedMultiplier: 2.45,
                    minSpeed: 430,
                    knockback: 250
                }
            },
            cooldownOnBasicHit: 0.35,
            cooldownOnDamageTaken: 0,
            immuneToBasic: true
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
