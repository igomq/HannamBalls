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
        shingyu: "SG",
        dongha: "DH",
        bbangki: "BK",
        faker: "FK",
        hyunho: "HH",
        roh: "MH",
        owl: "부엉",
        mic: "MIC",
        piaget: "피아"
    };

    window.HANNAM_BALLS_CHARACTERS = [
        {
            id: "song-geonuk",
            name: "송건욱",
            shortName: "건욱",
            maxHp: 610,
            baseAttack: 25,
            speedLabel: "느림",
            speed: 170,
            colorName: "검은색",
            color: "#111111",
            textColor: "#ffffff",
            avatarText: placeholderFaces.song,
            traits: ["성장형 공격력", "느린 시작"],
            skill: {
                name: "다이어트",
                cooldown: 7,
                description: "현재 체력의 5.5%가 감소하는 대신, 기본 공격력이 4 증가하고 이동 속도가 15.5% 상승하며 받는 피해가 2.5% 감소합니다. 최대 피해 감소 10%. 4회 다이어트 이후 기본 공격 면역을 뚫습니다. (면역 대상에게는 증가 공격력 미적용)",
                effects: {
                    hpCostRatio: 0.055,
                    attackGain: 4,
                    speedMultiplier: 1.155,
                    damageReductionGain: 0.025,
                    maxDamageReduction: 0.1,
                    pierceBasicAfterUses: 4
                }
            },
            cooldownOnBasicHit: 0,
            cooldownOnDamageTaken: 1,
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
            speed: 180,
            colorName: "회색",
            color: "#7b7f86",
            textColor: "#ffffff",
            avatarText: placeholderFaces.yuseung,
            traits: ["근거리 광역기", "쿨타임 순환"],
            skill: {
                name: "쿵쾅!",
                cooldown: 6.5,
                description: "주변 적에게 95의 피해를 주고 1초간 행동 불가 상태로 만듭니다.",
                effects: {
                    damage: 95,
                    stunSeconds: 1,
                    radius: 175
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
            maxHp: 370,
            baseAttack: 10,
            speedLabel: "보통",
            speed: 215,
            colorName: "하늘색",
            color: "#38bdf8",
            textColor: "#001a42",
            avatarText: placeholderFaces.hanye,
            traits: ["전체 빙결", "받을수록 빨라지는 스킬"],
            skill: {
                name: "아이스 에이지",
                cooldown: 12.5,
                description: "모든 적을 1초간 행동 불가 상태로 만들고 125의 피해를 입힙니다. 잠깐 맵 절반이 얼음 구역이 되며, 구역 안 캐릭터는 스킬 피해량의 30%만큼 추가 피해를 입습니다. 이 구역 피해량의 50%만큼 회복합니다.",
                effects: {
                    damage: 125,
                    stunSeconds: 1,
                    iceZoneDuration: 2.4,
                    iceZoneBonusRatio: 0.3,
                    iceZoneHealRatio: 0.5
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
            maxHp: 390,
            baseAttack: 12,
            speedLabel: "매우빠름",
            speed: 325,
            colorName: "흰색",
            color: "#f3ecd3ff",
            textColor: "#1c1b1b",
            avatarText: placeholderFaces.jeongyuseung,
            traits: ["현재 체력 비례 기본 공격", "최고 체력 적 저격"],
            passive: {
                name: "돼지 도축",
                description: "기본 공격 시 적 현재 체력의 12.5%만큼 피해를 추가로 입힙니다.",
                effects: {
                    basicCurrentHpBonusRatio: 0.125
                }
            },
            skill: {
                name: "음식 남기기",
                cooldown: 9,
                description: "현재 체력이 가장 높은 적에게 최대 체력의 19%만큼 피해를 입히고, 스킬 피해량의 40%만큼 회복합니다.",
                effects: {
                    maxHpDamageRatio: 0.19,
                    healRatio: 0.4
                }
            },
            cooldownOnBasicHit: 1.25,
            cooldownOnDamageTaken: 1.25,
            immuneToBasic: false,
            avatarSrc: 'images/yuseung.png'
        },
        {
            id: "lee-woochan",
            name: "이우찬",
            shortName: "우찬",
            maxHp: 305,
            baseAttack: 9,
            speedLabel: "빠름",
            speed: 270,
            colorName: "보라색",
            color: "#8127cf",
            textColor: "#ffffff",
            avatarText: placeholderFaces.woochan,
            traits: ["기본 공격 면역", "고속 돌진", "돌진 중 저지불가"],
            skill: {
                name: "무지성 돌진",
                cooldown: 2.2,
                description: "앞으로 매우 빠르게 돌진하면서 경로에 있는 적에게 17의 피해를 입히고 주변으로 밀쳐냅니다. 돌진 중에는 스턴에 걸리지 않습니다.",
                effects: {
                    damage: 17,
                    durationMs: 1000,
                    speedMultiplier: 9,
                    minSpeed: 430,
                    knockback: 250
                }
            },
            cooldownOnBasicHit: 0.2,
            cooldownOnDamageTaken: 0,
            immuneToBasic: true,
            unstoppableWhileCharging: true,
            avatarSrc: 'images/woochan.png'
        },
        {
            id: "lee-seunghyun",
            name: "이승현",
            shortName: "승현",
            maxHp: 295,
            baseAttack: 19,
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
                description: "항상 맵 모서리로 이동하며, 적의 밀치기 스킬에 영향을 받지 않습니다. 이동 중 2초간 지속되는 장판을 만들고, 장판 피해량의 55%만큼 체력을 회복합니다. 처음으로 체력이 30% 미만으로 떨어지면 최대 체력의 40%에 해당하는 보호막을 얻습니다.",
                effects: {
                    puddleDamage: 19,
                    puddleDuration: 2,
                    puddleTickInterval: 0.55,
                    puddleRadius: 62,
                    puddleRadiusRatio: 0.105,
                    healRatio: 0.55,
                    dropInterval: 0.42,
                    maxActivePuddles: 5,
                    shieldThresholdRatio: 0.3,
                    shieldRatio: 0.4
                }
            },
            skill: {
                name: "음침 물들이기",
                cooldown: 13,
                description: "맵 밖으로 잠깐 나가 피해를 입지 않고, 맵 전역에 독 장판을 깝니다. 첫 사용은 무적 2초, 틱당 25 피해이며, 사용할 때마다 다음 쿨타임은 3.5초, 무적 시간은 1초, 틱당 피해는 10씩 증가합니다.",
                effects: {
                    poisonDps: 25,
                    duration: 2,
                    offMapDuration: 2,
                    tickInterval: 0.44,
                    cooldownIncrease: 3.5,
                    offMapDurationIncrease: 1,
                    poisonDpsIncrease: 10
                }
            },
            cooldownOnBasicHit: 0.33,
            cooldownOnDamageTaken: 0.5,
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
            maxHp: 380,
            baseAttack: 10,
            speedLabel: "매우 빠름",
            speed: 315,
            colorName: "민트색",
            color: "#42bb74ff",
            textColor: "#ffffff",
            avatarText: placeholderFaces.hyunwoo,
            traits: ["엄마 소환", "피격 쿨감", "소환수 흡혈"],
            skill: {
                name: "엄마 빌려오기",
                cooldown: 22,
                description: "체력 275, 기본 공격력 40, 이동속도 매우 빠름의 엄마를 소환합니다. 엄마는 현우를 공격하지 않으며, 초당 25씩 체력이 감소하고, 엄마가 입힌 피해의 30%만큼 이현우가, 50%만큼 엄마가 회복합니다.",
                effects: {
                    summon: {
                        id: "lee-hyunwoo-mom",
                        name: "현우 엄마",
                        shortName: "엄마",
                        maxHp: 275,
                        baseAttack: 40,
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
            id: "kim-dongha",
            name: "김동하",
            shortName: "동하",
            maxHp: 455,
            baseAttack: 18,
            speedLabel: "빠름",
            speed: 290,
            colorName: "정열적인 붉은색",
            color: "#e11d48",
            textColor: "#ffffff",
            avatarSrc: "images/dongha.png",
            avatarText: placeholderFaces.dongha,
            traits: ["보호막 파괴", "강화 꽃 장판", "매혹"],
            passive: {
                name: "꽃미남 · 쨍그랑",
                description: "적과 부딪히면 주변에 3초간 지속되는 꽃 장판을 만들어 초당 34의 피해를 입히고, 입힌 피해량의 55%만큼 체력을 회복합니다. 부딪힌 적에게 보호막이 있다면 현재 보호막의 50%를 파괴합니다.",
                effects: {
                    duration: 3,
                    damagePerSecond: 34,
                    tickInterval: 0.2,
                    radius: 82,
                    healRatio: 0.55,
                    cooldown: 1.5,
                    shieldBreakRatio: 0.5
                }
            },
            skill: {
                name: "매혹",
                cooldown: 11,
                description: "가장 가까운 적을 매혹시켜 강제로 스킬을 시전시키게 합니다. 이 스킬로 인한 피해는 김동하가 입지 않고 피해량만큼 체력을 회복합니다.",
                effects: {}
            },
            cooldownOnBasicHit: 0.5,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false
        },
        {
            id: "lee-jihoon",
            name: "이지훈",
            shortName: "지훈",
            maxHp: 175,
            baseAttack: 0,
            speedLabel: "매우 빠름",
            speed: 320,
            colorName: "핑크색",
            color: "#ec4899",
            textColor: "#ffffff",
            avatarText: placeholderFaces.jihoon,
            traits: ["기본 공격 회피", "회피 회복", "집착 추적"],
            passive: {
                name: "회피형 인간",
                description: "적의 기본 공격을 회피할 때마다 최대 체력의 5.5%만큼 체력을 회복합니다.",
                effects: {
                    healOnBasicEvadeRatio: 0.055
                }
            },
            skill: {
                name: "말 걸어준건 너가 처음이야",
                cooldown: 9.5,
                description: "가장 가까운 적을 5초간 따라다니며 매초 34의 피해를 입힙니다.",
                effects: {
                    duration: 5,
                    damagePerSecond: 34,
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
            maxHp: 375,
            baseAttack: 15,
            speedLabel: "보통",
            speed: 215,
            colorName: "남색",
            color: "#1e3a8a",
            textColor: "#ffffff",
            avatarText: placeholderFaces.heoyul,
            traits: ["스킬 도둑", "잠깐 단단함", "쓰면 느려짐"],
            skill: {
                name: "생활지능 포기하고 얻은 공부지능",
                cooldown: 8,
                description: "가장 가까운 캐릭터의 스킬을 훔쳐 사용하고 3초간 받는 피해가 35% 감소합니다. 대신 이동속도가 4 감소합니다.",
                effects: {
                    copyClosestSkill: true,
                    damageReduction: 0.35,
                    damageReductionDuration: 3,
                    speedLoss: 4
                }
            },
            cooldownOnBasicHit: 0.5,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false,
            avatarSrc: 'images/yul.png'
        },
        {
            id: "heo-jaemin",
            name: "허재민",
            shortName: "재민",
            maxHp: 335,
            baseAttack: 22,
            speedLabel: "존나빠름",
            speed: 430,
            colorName: "노란색",
            color: "#facc15",
            textColor: "#1c1b1b",
            avatarText: placeholderFaces.heojaemin,
            traits: ["초스피드", "광역 둔화", "자가 가속", "쿨타임 순환"],
            skill: {
                name: "뭉개뭉개 구름",
                cooldown: 10,
                description: "주변 캐릭터들의 이동 속도를 크게 낮추고 32의 피해를 입히고 입힌 피해량의 55%만큼 체력을 회복하며, 잠시 본인의 이동 속도가 크게 증가합니다.",
                effects: {
                    damage: 32,
                    radius: 215,
                    slowMultiplier: 0.4,
                    slowDuration: 2,
                    hasteMultiplier: 1.65,
                    hasteDuration: 4,
                    healRatio: 0.55
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
            baseAttack: 26,
            speedLabel: "보통",
            speed: 225,
            colorName: "빨간색",
            color: "#dc2626",
            textColor: "#ffffff",
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
                description: "공안을 불러와 가장 가까운 적을 3초간 이동 불가 상태로 만들고 150의 피해를 입힙니다.",
                effects: {
                    damage: 150,
                    stunSeconds: 3
                }
            },
            cooldownOnBasicHit: 0.5,
            cooldownOnDamageTaken: 0.5,
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
            baseAttack: 3,
            speedLabel: "이동 불가",
            speed: 0,
            colorName: "연두색",
            color: "#84cc16",
            textColor: "#1c1b1b",
            avatarText: placeholderFaces.kanghyunwoo,
            traits: ["원거리 딜러", "제자리 포탑", "시간 성장"],
            passive: {
                name: "배짱이새끼",
                description: "움직이지 못하는 대신 가까운 적을 0.25초마다 공격하며 입힌 피해량의 35%만큼 회복합니다. 게임 시간 7초마다 기본 공격 피해량이 4 증가합니다.",
                effects: {
                    rangedAttack: true,
                    interval: 0.25,
                    damage: 3,
                    healRatio: 0.35,
                    growthInterval: 7,
                    growthDamage: 4
                }
            },
            skill: {
                name: "대시",
                cooldown: 2,
                description: "적이 없는 방향으로 회피하며, 가장 가까운 적에게 8의 피해를 줍니다.",
                effects: {
                    dashDistance: 115,
                    dashDamage: 8
                }
            },
            cooldownOnBasicHit: 0.1,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false,
            contactAttackDisabled: true,
            immobile: true,
            avatarSrc: 'images/hyunwoo_k.png'
        },
        {
            id: "faker",
            category: "boss",
            name: "대상혁",
            shortName: "대상혁",
            maxHp: 1557,
            baseAttack: 15.57,
            speedLabel: "초월",
            speed: 488,
            colorName: "월즈 우승 트로피",
            color: "#f59e0b",
            textColor: "#1c1b1b",
            avatarSrc: "images/faker.png",
            avatarText: placeholderFaces.faker,
            traits: ["압도적 OP", "전장 전체 제압", "불사대마왕"],
            passive: {
                name: "불사대마왕",
                description: "모든 군중 제어 효과의 지속시간이 50% 감소합니다. 최대 2회, 죽기 직전에 최대 체력의 88.848%를 회복하고 최대 체력의 15.57%만큼 보호막을 얻습니다. 발동할 때마다 공격력이 15.57 증가하고 스킬 쿨타임이 2.5초 감소합니다.",
                effects: {
                    maxTriggers: 2,
                    reviveHpRatio: 0.88848,
                    shieldRatio: 0.1557,
                    attackGain: 15.57,
                    cooldownReduction: 2.5
                }
            },
            skill: {
                name: "미드차이",
                cooldown: 30,
                description: "압도적인 권능을 시전해 주변 넓은 범위의 캐릭터에게 155.7 피해를 입히고 6초간 기절시킵니다. 불사대마왕 2회를 모두 소모한 뒤 6초 이내에 월즈 트로피를 흡수하면 6초간 고전파 모드에 진입합니다.",
                effects: {
                    damage: 155.7,
                    stunSeconds: 6,
                    radius: 255,
                    trophyInterval: 6,
                    trophyHealRatio: 0.1557,
                    healingBlockDuration: 15.57,
                    gogeonpaWindow: 6,
                    gogeonpaDuration: 6,
                    gogeonpaSpeedMultiplier: 0.5
                }
            },
            mapEffects: {
                trophy: {
                    name: "월즈 트로피",
                    interval: 6,
                    bossHealRatio: 0.1557,
                    partyDamageMultiplier: 2,
                    healingBlockDuration: 15.57,
                    gogeonpaWindow: 6,
                    gogeonpaDuration: 6,
                    description: "6초마다 맵에 월즈 트로피가 소환됩니다. 대상혁이 흡수하면 최대 체력의 15.57%를 회복합니다. 레이드 파티가 흡수하면 해당 캐릭터의 피해량이 2배가 되고, 대상혁은 15.57초간 회복이 봉인됩니다. 불사대마왕을 모두 소모한 뒤 6초 이내에 대상혁이 트로피를 흡수하면 6초간 고전파 모드에 들어가며, 고전파 중 파티가 트로피를 먹으면 탈락한 아군 1명을 부활시킵니다."
                }
            },
            cooldownOnBasicHit: 0.75,
            cooldownOnDamageTaken: 0.1,
            crowdControlDurationMultiplier: 0.5,
            immuneToBasic: false,
            immuneToKnockback: true
        },
        {
            id: "roh-moohyun",
            category: "boss",
            name: "노무현",
            shortName: "노무현",
            unlockRequirement: {
                clearBossId: "faker",
                label: "대상혁 보스전 클리어 시 해금"
            },
            maxHp: 2009,
            baseAttack: 52.3,
            speedLabel: "빠름",
            speed: 252.3,
            colorName: "노무랑",
            color: "#f5d82c",
            textColor: "#ffffff",
            avatarText: placeholderFaces.roh,
            traits: ["이중 스킬", "표식 기절", "부엉이 소환", "운지", "마이크·피아제"],
            startingDamageReduction: 0.0523,
            passive: {
                name: "부끄러운 줄 알아야지!",
                description: "노무현과 충돌하면 노무현이 표식을 남깁니다. 이후에 다시 충돌할 경우, 표식을 소모하며 52.3의 추가 피해를 입히고 2.09초간 기절시킵니다.",
                effects: {
                    markBonusDamage: 52.3,
                    markStunSeconds: 2.09
                }
            },
            skill: {
                name: "부엉이 소환",
                cooldown: 15.23,
                description: "체력 523, 공격력 20.09의 부엉이를 소환합니다. 부엉이는 바위 떨구기(쿨타임 5.23초)로 전방 직선에 바위를 떨궈 맞은 적에게 52.3 피해를 주고 2.09초간 기절시킵니다.",
                effects: {
                    summon: {
                        id: "roh-owl",
                        name: "부엉이",
                        shortName: "부엉이",
                        maxHp: 523,
                        baseAttack: 20.09,
                        speedLabel: "빠름",
                        speed: 252.3,
                        colorName: "밤부엉이",
                        color: "#57534e",
                        textColor: "#fafaf9",
                        avatarText: placeholderFaces.owl,
                        traits: ["소환수", "바위 떨구기"],
                        skill: {
                            name: "바위 떨구기",
                            cooldown: 5.23,
                            description: "자신 앞 직선 경로로 바위를 떨굽니다. 바위에 맞은 적은 52.3 피해를 입고 2.09초간 중력이 강하게 작용해 기절합니다.",
                            effects: {
                                rockDamage: 52.3,
                                rockSpeed: 523,
                                rockRange: 420,
                                rockRadius: 42,
                                stunSeconds: 2.09
                            }
                        },
                        cooldownOnBasicHit: 0.523,
                        cooldownOnDamageTaken: 0.209,
                        immuneToBasic: false,
                        isSummonDefinition: true,
                        hpDecayPerSecond: 0
                    }
                }
            },
            skill2: {
                name: "운지",
                cooldown: 12.09,
                description: "가장 가까운 캐릭터를 강제로 자신 앞으로 데려와 맵 밖으로 추락시켜 해당 캐릭터의 최대 체력의 20.09%에 해당하는 피해를 입힙니다. 이 피해로 사망하면 노무현은 최대 체력의 20.09%만큼 회복하고 52.3%만큼의 보호막을 얻습니다.",
                effects: {
                    maxHpDamageRatio: 0.2009,
                    killHealRatio: 0.2009,
                    killShieldRatio: 0.523,
                    offMapDuration: 2.09
                }
            },
            mapEffects: {
                mic: {
                    maxHp: 209,
                    damageThresholdRatio: 0.0523,
                    lifetime: 5.23,
                    failHealRatio: 0.2009,
                    successAttackBuffRatio: 0.0523
                },
                piaget: {
                    maxHp: 523,
                    interval: 20.09,
                    failStunSeconds: 2.09,
                    failPartyHealRatio: 0.2009,
                    failPartyDamageBoost: 0.523,
                    successStunSeconds: 5.23,
                    successHealRatio: 0.523
                }
            },
            cooldownOnBasicHit: 0.523,
            cooldownOnDamageTaken: 0.523,
            crowdControlDurationMultiplier: 0.523,
            immuneToBasic: false,
            immuneToKnockback: true,
            avatarSrc: 'images/muhyun.png'
        },
        {
            id: "bbangki",
            name: "ㅃ키",
            shortName: "ㅃ키",
            maxHp: 255,
            baseAttack: 1,
            speedLabel: "ㅈㄴ 빠름",
            speed: 545,
            colorName: "청록색",
            color: "#14b8a6",
            textColor: "#001a42",
            avatarSrc: "images/bbangki.png",
            avatarText: placeholderFaces.bbangki,
            traits: ["기본 공격 1", "초고속 방해", "각성 후 현타"],
            startingDamageReduction: 0.18,
            passive: {
                name: "ㅃ키행동",
                description: "항상 피해를 조금 덜 받고 매우 빠르게 돌아다닙니다. 단, 마지막 대치 구도에서는 어그로가 몰려 받는 피해가 증가합니다.",
                effects: {
                    duelDamageTakenMultiplier: 1.75
                }
            },
            skill: {
                name: "ㅃ키각성",
                cooldown: 5.6,
                description: "3.2초간 이동 속도가 크게 증가하고 받는 피해가 크게 감소합니다. 각성이 끝나면 현타로 최대 체력 비례 피해를 입으며, 사용할수록 현타 피해가 커집니다.",
                effects: {
                    duration: 3.2,
                    hasteMultiplier: 1.95,
                    damageReduction: 0.62,
                    recoilBaseRatio: 0.07,
                    recoilGrowthRatio: 0.025,
                    maxRecoilRatio: 0.18
                }
            },
            cooldownOnBasicHit: 0.1,
            cooldownOnDamageTaken: 0.8,
            immuneToBasic: false
        },
        {
            id: "mun-hyunho",
            name: "문현호",
            shortName: "현호",
            maxHp: 655,
            baseAttack: 9,
            speedLabel: "보통",
            speed: 215,
            colorName: "먹방 오렌지",
            color: "#f97316",
            textColor: "#ffffff",
            avatarSrc: "images/hyunho.png",
            avatarText: placeholderFaces.hyunho,
            traits: ["높은 체력", "맛보기 표식", "중앙 먹방"],
            passive: {
                name: "맛보기",
                description: "기본 공격에 맞은 적에게 눈에 띄는 맛보기 표식을 남깁니다. 표식이 있는 적을 기본 공격하면 기본 공격력의 5배만큼 추가 피해를 입힌 뒤 표식을 삭제합니다.",
                effects: {
                    markedBasicBonusMultiplier: 5
                }
            },
            skill: {
                name: "먹방",
                cooldown: 18,
                description: "맵 정중앙에 5초간 고정되고 받는 피해가 크게 감소합니다. 이 동안 부딪힌 적을 먹어 현재 체력의 50%를 빼앗고, 먹힌 적은 모션 뒤 남은 시간 동안 뱃속에 있어 맵에서 사라집니다. 먹은 피해로 적이 죽으면 이동 속도가 10 감소하는 대신 최대 체력과 체력이 20, 공격력이 2 증가합니다. 아무도 먹지 못하면 본인 최대 체력의 7.5%만큼 피해를 입습니다.",
                effects: {
                    duration: 5,
                    currentHpStealRatio: 0.5,
                    failSelfDamageRatio: 0.075,
                    damageReduction: 0.75
                }
            },
            cooldownOnBasicHit: 0.35,
            cooldownOnDamageTaken: 0.5,
            immuneToBasic: false
        },
        {
            id: "lim-shingyu",
            name: "임신규",
            shortName: "신규",
            maxHp: 515,
            baseAttack: 26,
            speedLabel: "매우 느림",
            speed: 130,
            colorName: "녹색",
            color: "#16a34a",
            textColor: "#ffffff",
            avatarText: placeholderFaces.shingyu,
            traits: ["폭탄 부여", "광역 폭발", "기본공격 쿨감"],
            skill: {
                name: "임신펀치",
                cooldown: 13.5,
                description: "가장 가까운 적에게 폭탄을 임신시킵니다. 폭탄은 3초 뒤 터지며 대상에게 125, 주변에 55의 피해를 입히고 이동 불가 상태로 만듭니다.",
                effects: {
                    delay: 3,
                    targetDamage: 125,
                    splashDamage: 55,
                    radius: 175,
                    stunSeconds: 1.4
                }
            },
            cooldownOnBasicHit: 2,
            cooldownOnDamageTaken: 0,
            immuneToBasic: false,
            avatarSrc: 'images/shingyu.png'
        }
    ];

    const CLEARED_BOSSES_KEY = "hannamBallsClearedBosses";

    function readClearedBosses() {
        try {
            const parsed = JSON.parse(localStorage.getItem(CLEARED_BOSSES_KEY) || "[]");
            return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
        } catch (_error) {
            return [];
        }
    }

    function writeClearedBosses(ids) {
        const unique = [...new Set(ids.filter((id) => typeof id === "string"))];
        localStorage.setItem(CLEARED_BOSSES_KEY, JSON.stringify(unique));
        return unique;
    }

    window.HannamBalls = {
        CLEARED_BOSSES_KEY,
        getCharacters() {
            return window.HANNAM_BALLS_CHARACTERS.map((character) => JSON.parse(JSON.stringify(character)));
        },
        getCharacter(id) {
            const character = window.HANNAM_BALLS_CHARACTERS.find((item) => item.id === id);
            return character ? JSON.parse(JSON.stringify(character)) : null;
        },
        getClearedBosses() {
            return readClearedBosses();
        },
        markBossCleared(bossId) {
            if (!bossId) {
                return readClearedBosses();
            }
            const cleared = readClearedBosses();
            if (!cleared.includes(bossId)) {
                cleared.push(bossId);
            }
            return writeClearedBosses(cleared);
        },
        isBossUnlocked(characterOrId) {
            const character = typeof characterOrId === "string"
                ? window.HANNAM_BALLS_CHARACTERS.find((item) => item.id === characterOrId)
                : characterOrId;
            if (!character || character.category !== "boss") {
                return true;
            }
            const requirement = character.unlockRequirement;
            if (!requirement?.clearBossId) {
                return true;
            }
            return readClearedBosses().includes(requirement.clearBossId);
        },
        getBossUnlockLabel(characterOrId) {
            const character = typeof characterOrId === "string"
                ? window.HANNAM_BALLS_CHARACTERS.find((item) => item.id === characterOrId)
                : characterOrId;
            return character?.unlockRequirement?.label || "해금 조건 미충족";
        }
    };
})();
