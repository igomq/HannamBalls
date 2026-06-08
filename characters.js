(function () {
    const placeholderFaces = {
        song: "GW",
        yuseung: "YS",
        jeongyuseung: "JY",
        hanye: "YJ",
        woochan: "WC",
        seunghyun: "SH",
        hyunwoo: "HW",
        jihoon: "JH",
        mom: "엄마",
        heoyul: "HY",
        heojaemin: "JM",
        junmo: "JM",
        haejin: "HJ",
        kanghyunwoo: "KH",
        shingyu: "SG"
    };

    window.HANNAM_BALLS_CHARACTERS = [
        {
            id: "song-geonuk",
            name: "송건욱",
            shortName: "건욱",
            maxHp: 690,
            baseAttack: 28,
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
                cooldown: 7,
                description: "현재 체력의 5.5%가 감소하는 대신, 기본 공격력이 6 증가하고 이동 속도가 15.5% 상승하며 받는 피해가 4% 감소합니다. 최대 피해 감소 20%. 3회 다이어트 이후 기본 공격 면역을 뚫습니다. (면역 대상에게는 증가 공격력 미적용)",
                effects: {
                    hpCostRatio: 0.055,
                    attackGain: 6,
                    speedMultiplier: 1.155,
                    damageReductionGain: 0.04,
                    maxDamageReduction: 0.2,
                    pierceBasicAfterUses: 3
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false,
            avatarSrc: 'images/geonuk.png'
        },
        {
            id: "yoo-seungchan",
            name: "유승찬",
            shortName: "승찬",
            maxHp: 490,
            baseAttack: 22,
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
                cooldown: 6.5,
                description: "주변 적에게 100의 피해를 주고 1초간 행동 불가 상태로 만듭니다.",
                effects: {
                    damage: 100,
                    stunSeconds: 1,
                    radius: 190
                }
            },
            cooldownOnBasicHit: 0.5,
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
                description: "모든 적을 1초간 행동 불가 상태로 만들고 140의 피해를 입힙니다. 잠깐 맵 절반이 얼음 구역이 되며, 구역 안 캐릭터는 스킬 피해량의 40%만큼 추가 피해를 입습니다. 이 구역 피해량의 15%만큼 회복합니다.",
                effects: {
                    damage: 140,
                    stunSeconds: 1,
                    iceZoneDuration: 2.4,
                    iceZoneBonusRatio: 0.4,
                    iceZoneHealRatio: 0.15
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false,
            avatarSrc: 'images/yejun.png'
        },
        {
            id: "jeong-yuseung",
            name: "정유승",
            shortName: "유승",
            maxHp: 360,
            baseAttack: 9,
            speedLabel: "매우빠름",
            speed: 325,
            colorName: "흰색",
            color: "#f3ecd3ff",
            textColor: "#1c1b1b",
            avatarSrc: "",
            avatarText: placeholderFaces.jeongyuseung,
            traits: ["현재 체력 비례 기본 공격", "최고 체력 적 저격"],
            passive: {
                name: "돼지 도축",
                description: "기본 공격 시 적 현재 체력의 7.5%만큼 피해를 추가로 입힙니다.",
                effects: {
                    basicCurrentHpBonusRatio: 0.075
                }
            },
            skill: {
                name: "음식 남기기",
                cooldown: 7,
                description: "현재 체력이 가장 높은 적에게 현재 체력의 35%만큼 피해를 입히고, 스킬 피해량의 50%만큼 회복합니다.",
                effects: {
                    currentHpDamageRatio: 0.35,
                    healRatio: 0.5
                }
            },
            cooldownOnBasicHit: 1,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            avatarSrc: 'images/yuseung.png'
        },
        {
            id: "lee-woochan",
            name: "이우찬",
            shortName: "우찬",
            maxHp: 315,
            baseAttack: 12,
            speedLabel: "빠름",
            speed: 275,
            colorName: "보라색",
            color: "#8127cf",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.woochan,
            traits: ["기본 공격 면역", "고속 돌진", "돌진 중 저지불가"],
            skill: {
                name: "무지성 돌진",
                cooldown: 4.8,
                description: "앞으로 매우 빠르게 돌진하면서 경로에 있는 적에게 45의 피해를 입히고 주변으로 밀쳐냅니다. 돌진 중에는 스턴에 걸리지 않습니다.",
                effects: {
                    damage: 45,
                    durationMs: 660,
                    speedMultiplier: 2.75,
                    minSpeed: 430,
                    knockback: 250
                }
            },
            cooldownOnBasicHit: 0.4,
            cooldownOnDamageTaken: 0,
            immuneToBasic: true,
            unstoppableWhileCharging: true,
            avatarSrc: 'images/woochan.png'
        },
        {
            id: "lee-seunghyun",
            name: "이승현",
            shortName: "승현",
            maxHp: 265,
            baseAttack: 18,
            speedLabel: "빠름",
            speed: 255,
            colorName: "적갈색",
            color: "#8b2f23",
            textColor: "#ffffff",
            avatarSrc: "images/seunghyun.png",
            avatarText: placeholderFaces.seunghyun,
            traits: ["모서리 이동", "장판 흡혈", "밀치기 면역", "체력 50% 이하 보호막"],
            passive: {
                name: "음침한 기운",
                description: "항상 맵 모서리로 이동하며, 적의 밀치기 스킬에 영향을 받지 않습니다. 이동 중 2초간 지속되는 장판을 만들고, 장판 피해량의 45%만큼 체력을 회복합니다. 처음으로 체력이 30% 미만으로 떨어지면 최대 체력의 50%에 해당하는 보호막을 얻습니다.",
                effects: {
                    puddleDamage: 28,
                    puddleDuration: 2,
                    puddleTickInterval: 0.55,
                    puddleRadius: 62,
                    puddleRadiusRatio: 0.105,
                    healRatio: 0.45,
                    dropInterval: 0.42,
                    maxActivePuddles: 5,
                    shieldThresholdRatio: 0.3,
                    shieldRatio: 0.5
                }
            },
            skill: {
                name: "음침 물들이기",
                cooldown: 15,
                description: "맵 밖으로 잠깐 나가 피해를 입지 않고, 맵 전역에 독 장판을 깝니다. 첫 사용은 무적 2초/초당 20 피해이며, 사용할 때마다 다음 쿨타임은 6초, 무적 시간은 1초, 초당 피해는 10씩 증가합니다.",
                effects: {
                    poisonDps: 20,
                    duration: 2,
                    offMapDuration: 2,
                    tickInterval: 0.5,
                    cooldownIncrease: 6,
                    offMapDurationIncrease: 1,
                    poisonDpsIncrease: 10
                }
            },
            cooldownOnBasicHit: 0.22,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            immuneToKnockback: true,
            contactAttackDisabled: true,
            noPushCollision: true,
            movementPattern: "corners"
        },
        {
            id: "lee-hyunwoo",
            name: "이현우",
            shortName: "현우",
            maxHp: 355,
            baseAttack: 10,
            speedLabel: "매우 빠름",
            speed: 315,
            colorName: "민트색",
            color: "#42bb74ff",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.hyunwoo,
            traits: ["엄마 소환", "피격 쿨감", "소환수 흡혈"],
            skill: {
                name: "엄마 빌려오기",
                cooldown: 24,
                description: "체력 225, 기본 공격력 45, 이동속도 매우 빠름의 엄마를 소환합니다. 엄마는 현우를 공격하지 않으며, 초당 25씩 체력이 감소하고, 엄마가 입힌 피해의 30%만큼 이현우가, 50%만큼 엄마가 회복합니다.",
                effects: {
                    summon: {
                        id: "lee-hyunwoo-mom",
                        name: "현우 엄마",
                        shortName: "엄마",
                        maxHp: 225,
                        baseAttack: 45,
                        speedLabel: "매우 빠름",
                        speed: 315,
                        colorName: "민트색",
                        color: "#2f9175ff",
                        textColor: "#ffffff",
                        avatarSrc: "",
                        avatarText: placeholderFaces.mom,
                        traits: ["소환수", "흡혈", "시간 제한"],
                        skill: {
                            name: "엄마의 잔소리",
                            cooldown: 999,
                            description: "스킬을 사용하지 않는 소환수입니다.",
                            effects: {}
                        },
                        cooldownOnBasicHit: 0,
                        cooldownOnDamageTaken: 0,
                        immuneToBasic: false,
                        isSummonDefinition: true,
                        hpDecayPerSecond: 25,
                        ownerHealRatioFromDamage: 0.5,
                        selfHealRatioFromDamage: 1
                    }
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 3,
            immuneToBasic: false,
            avatarSrc: 'images/hyunwoo.png'
        },
        {
            id: "lee-jihoon",
            name: "이지훈",
            shortName: "지훈",
            maxHp: 130,
            baseAttack: 0,
            speedLabel: "매우 빠름",
            speed: 320,
            colorName: "핑크색",
            color: "#ec4899",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.jihoon,
            traits: ["기본 공격 회피", "회피 회복", "집착 추적"],
            passive: {
                name: "회피형 인간",
                description: "적의 기본 공격을 회피할 때마다 최대 체력의 5%만큼 체력을 회복합니다.",
                effects: {
                    healOnBasicEvadeRatio: 0.05
                }
            },
            skill: {
                name: "말 걸어준건 너가 처음이야",
                cooldown: 9.5,
                description: "가장 가까운 적을 5초간 따라다니며 매초 30의 피해를 입힙니다.",
                effects: {
                    duration: 5,
                    damagePerSecond: 30,
                    tickInterval: 1,
                    followSpeedMultiplier: 1.25
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            evadesBasic: true,
            contactAttackDisabled: true,
            avatarSrc: 'images/jihoon.png'
        },
        {
            id: "heo-yul",
            name: "허율",
            shortName: "허율",
            maxHp: 365,
            baseAttack: 15,
            speedLabel: "보통",
            speed: 215,
            colorName: "남색",
            color: "#1e3a8a",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.heoyul,
            traits: ["스킬 도둑", "잠깐 단단함", "쓰면 느려짐"],
            skill: {
                name: "생활지능 포기하고 얻은 공부지능",
                cooldown: 8,
                description: "가장 가까운 캐릭터의 스킬을 훔쳐 사용하고 3초간 받는 피해가 감소합니다. 대신 이동속도가 5 감소합니다.",
                effects: {
                    copyClosestSkill: true,
                    damageReduction: 0.25,
                    damageReductionDuration: 3,
                    speedLoss: 5
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            avatarSrc: 'images/yul.png'
        },
        {
            id: "heo-jaemin",
            name: "허재민",
            shortName: "재민",
            maxHp: 400,
            baseAttack: 20,
            speedLabel: "보통",
            speed: 215,
            colorName: "노란색",
            color: "#facc15",
            textColor: "#1c1b1b",
            avatarSrc: "",
            avatarText: placeholderFaces.heojaemin,
            traits: ["광역 둔화", "자가 가속", "쿨타임 순환"],
            skill: {
                name: "뭉개뭉개 구름",
                cooldown: 10,
                description: "주변 캐릭터들의 이동 속도를 크게 낮추고 45의 피해를 입히며, 5초간 본인의 이동 속도가 크게 증가합니다.",
                effects: {
                    damage: 45,
                    radius: 180,
                    slowMultiplier: 0.45,
                    slowDuration: 3,
                    hasteMultiplier: 1.65,
                    hasteDuration: 5
                }
            },
            cooldownOnBasicHit: 1,
            cooldownOnDamageTaken: 1,
            immuneToBasic: false,
            avatarSrc: 'images/jaemin.png'
        },
        {
            id: "kim-junmo",
            name: "김준모",
            shortName: "준모",
            maxHp: 435,
            baseAttack: 25,
            speedLabel: "보통",
            speed: 215,
            colorName: "빨간색",
            color: "#dc2626",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.junmo,
            traits: ["단일 제압", "4번째 스킬 탈락"],
            passive: {
                name: "공산당의 저주",
                description: "스킬을 4회째 사용하면 본인이 공안에게 끌려가 탈락합니다.",
                effects: {
                    selfOutOnSkillUse: 4
                }
            },
            skill: {
                name: "공안 호출",
                cooldown: 10.5,
                description: "공안을 불러와 가장 가까운 적을 3.5초간 이동 불가 상태로 만들고 90의 피해를 입힙니다.",
                effects: {
                    damage: 90,
                    stunSeconds: 3.5
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            avatarSrc: 'images/junmo.png'
        },
        {
            id: "choi-haejin",
            name: "최해진",
            shortName: "해진",
            maxHp: 285,
            baseAttack: 45,
            speedLabel: "빠름",
            speed: 275,
            colorName: "핫핑크",
            color: "#ff1493",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.haejin,
            traits: ["암살", "처치 보상", "잠깐 사라짐"],
            passive: {
                name: "흥분",
                description: "적을 죽이면 체력을 55% 회복하고 현재 스킬 쿨타임이 65% 감소합니다.",
                effects: {
                    healOnKillRatio: 0.55,
                    cooldownOnKillRatio: 0.65
                }
            },
            skill: {
                name: "뒷치기",
                cooldown: 9,
                description: "1초간 맵에서 사라졌다가 랜덤한 캐릭터의 진행 방향 뒤에서 나와 75의 피해를 입히고, 스킬 피해량의 10%만큼 회복합니다.",
                effects: {
                    disappearDuration: 1,
                    damage: 75,
                    behindDistance: 92,
                    healRatio: 0.1
                }
            },
            cooldownOnBasicHit: 0.5,
            cooldownOnDamageTaken: 0.3,
            immuneToBasic: false,
            avatarSrc: 'images/haejin.png'
        },
        {
            id: "kang-hyunwoo",
            name: "강현우",
            shortName: "강현우",
            maxHp: 288,
            baseAttack: 4,
            speedLabel: "이동 불가",
            speed: 0,
            colorName: "연두색",
            color: "#84cc16",
            textColor: "#1c1b1b",
            avatarSrc: "",
            avatarText: placeholderFaces.kanghyunwoo,
            traits: ["원거리 딜러", "제자리 포탑", "시간 성장"],
            passive: {
                name: "배짱이새끼",
                description: "움직이지 못하는 대신 가까운 적을 0.25초마다 공격하며 입힌 피해량의 30%만큼 회복합니다. 게임 시간 10초마다 기본 공격 피해량이 4 증가합니다.",
                effects: {
                    rangedAttack: true,
                    interval: 0.25,
                    damage: 4,
                    healRatio: 0.3,
                    growthInterval: 10,
                    growthDamage: 4
                }
            },
            skill: {
                name: "대시",
                cooldown: 1.5,
                description: "적이 없는 방향으로 회피하며, 가장 가까운 적에게 10의 피해를 줍니다.",
                effects: {
                    dashDistance: 115,
                    dashDamage: 10
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false,
            contactAttackDisabled: true,
            immobile: true,
            avatarSrc: 'images/hyunwoo_k.png'
        },
        {
            id: "lim-shingyu",
            name: "임신규",
            shortName: "신규",
            maxHp: 515,
            baseAttack: 26,
            speedLabel: "매우 느림",
            speed: 120,
            colorName: "녹색",
            color: "#16a34a",
            textColor: "#ffffff",
            avatarSrc: "",
            avatarText: placeholderFaces.shingyu,
            traits: ["폭탄 부여", "광역 폭발", "기본공격 쿨감"],
            skill: {
                name: "임신펀치",
                cooldown: 14,
                description: "가장 가까운 적에게 폭탄을 임신시킵니다. 폭탄은 3.5초 뒤 터지며 대상에게 105, 주변에 55의 피해를 입히고 이동 불가 상태로 만듭니다.",
                effects: {
                    delay: 3.5,
                    targetDamage: 105,
                    splashDamage: 55,
                    radius: 150,
                    stunSeconds: 1.4
                }
            },
            cooldownOnBasicHit: 2,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            avatarSrc: 'images/shingyu.png'
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
