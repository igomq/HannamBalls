(function () {
    let _arena, _battle;

    window.initEffects = function (arena, battle) {
        _arena = arena;
        _battle = battle;
    };

    // 송건욱 - 다이어트 녹색 근육 파동
    window.dietAura = function (fighter) {
        for (let i = 0; i < 2; i++) {
            const aura = document.createElement("div");
            aura.className = "diet-aura";
            aura.style.left = `${fighter.x}px`;
            aura.style.top = `${fighter.y}px`;
            aura.style.width = `${_battle.ballSize * (1.4 + i * 0.5)}px`;
            aura.style.height = `${_battle.ballSize * (1.4 + i * 0.5)}px`;
            aura.style.animationDelay = `${i * 120}ms`;
            _arena.appendChild(aura);
            setTimeout(() => aura.remove(), 820);
        }
        const emojis = ["💪", "🔥", "⬆"];
        for (let i = 0; i < 3; i++) {
            const em = document.createElement("div");
            const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
            const dist = 28 + Math.random() * 18;
            em.className = "heart-particle";
            em.style.left = `${fighter.x}px`;
            em.style.top = `${fighter.y}px`;
            em.style.fontSize = "18px";
            em.style.setProperty("--hx", `${Math.cos(angle) * dist}px`);
            em.style.setProperty("--hy", `${Math.sin(angle) * dist}px`);
            em.textContent = emojis[i];
            _arena.appendChild(em);
            setTimeout(() => em.remove(), 860);
        }
    };

    // 유승찬 - 쿵쾅! 지면 균열 충격파
    window.groundSlam = function (x, y, radius, color) {
        const wave = document.createElement("div");
        wave.className = "ground-shockwave";
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        wave.style.width = `${radius * 2}px`;
        wave.style.height = `${radius * 2}px`;
        wave.style.color = color;
        _arena.appendChild(wave);
        setTimeout(() => wave.remove(), 600);

        const crack = document.createElement("div");
        crack.className = "ground-crack";
        crack.style.left = `${x}px`;
        crack.style.top = `${y}px`;
        crack.style.width = `${radius * 2.2}px`;
        crack.style.height = `${radius * 2.2}px`;
        crack.style.color = color;
        _arena.appendChild(crack);
        setTimeout(() => crack.remove(), 750);

        for (let i = 0; i < 6; i++) {
            const d = document.createElement("div");
            const a = (Math.PI * 2 * i) / 6;
            const dist = radius * 0.4 + Math.random() * radius * 0.3;
            d.className = "effect-burst";
            d.style.left = `${x}px`;
            d.style.top = `${y}px`;
            d.style.color = "#6b7280";
            d.style.setProperty("--dx", `${Math.cos(a) * dist}px`);
            d.style.setProperty("--dy", `${Math.sin(a) * dist}px`);
            _arena.appendChild(d);
            setTimeout(() => d.remove(), 500);
        }
    };

    // 한예준 - 아이스 에이지 얼음 결정 비산
    window.iceCrystals = function (x, y, count, color) {
        for (let i = 0; i < count; i++) {
            const c = document.createElement("div");
            const a = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const dist = 30 + Math.random() * 55;
            c.className = "ice-crystal";
            c.style.left = `${x}px`;
            c.style.top = `${y}px`;
            c.style.setProperty("--ix", `${Math.cos(a) * dist}px`);
            c.style.setProperty("--iy", `${Math.sin(a) * dist}px`);
            c.style.animationDelay = `${Math.random() * 200}ms`;
            _arena.appendChild(c);
            setTimeout(() => c.remove(), 1150);
        }
        const frost = document.createElement("div");
        frost.className = "frost-ring";
        frost.style.left = `${x}px`;
        frost.style.top = `${y}px`;
        frost.style.width = `${_battle.ballSize * 2.5}px`;
        frost.style.height = `${_battle.ballSize * 2.5}px`;
        _arena.appendChild(frost);
        setTimeout(() => frost.remove(), 850);
    };

    // 이우찬 - 무지성 돌진 잔상 궤적
    window.chargeGhost = function (fighter) {
        const ghost = document.createElement("div");
        ghost.className = "charge-ghost";
        ghost.style.left = `${fighter.x}px`;
        ghost.style.top = `${fighter.y}px`;
        ghost.style.width = `${_battle.ballSize}px`;
        ghost.style.height = `${_battle.ballSize}px`;
        ghost.style.color = fighter.definition.color;
        ghost.style.background = fighter.definition.color;
        ghost.style.opacity = "0.35";
        _arena.appendChild(ghost);
        setTimeout(() => ghost.remove(), 420);

        if (Math.random() < 0.6) {
            const line = document.createElement("div");
            const angle = Math.atan2(fighter.vy, fighter.vx);
            const len = 18 + Math.random() * 22;
            line.className = "speed-line";
            line.style.left = `${fighter.x - Math.cos(angle) * 18}px`;
            line.style.top = `${fighter.y - Math.sin(angle) * 18 + (Math.random() - 0.5) * _battle.ballSize * 0.5}px`;
            line.style.width = `${len}px`;
            line.style.color = fighter.definition.color;
            line.style.transformOrigin = "right center";
            line.style.transform = `rotate(${angle}rad)`;
            _arena.appendChild(line);
            setTimeout(() => line.remove(), 380);
        }
    };

    // 이승현 - 음침 물들이기 독안개
    window.poisonMist = function (x, y, color) {
        const mist = document.createElement("div");
        const size = _battle.arenaSize * 0.4;
        mist.className = "poison-mist-cloud";
        mist.style.left = `${x}px`;
        mist.style.top = `${y}px`;
        mist.style.width = `${size}px`;
        mist.style.height = `${size}px`;
        mist.style.color = color;
        _arena.appendChild(mist);
        setTimeout(() => mist.remove(), 1300);

        for (let i = 0; i < 5; i++) {
            const drop = document.createElement("div");
            drop.className = "poison-drop";
            drop.style.left = `${x + (Math.random() - 0.5) * 80}px`;
            drop.style.top = `${y + (Math.random() - 0.5) * 80}px`;
            drop.style.color = color;
            drop.style.animationDelay = `${Math.random() * 300}ms`;
            _arena.appendChild(drop);
            setTimeout(() => drop.remove(), 750);
        }
    };

    // 이현우 - 엄마 소환 포탈
    window.summonPortal = function (x, y, color) {
        const portal = document.createElement("div");
        const size = _battle.ballSize * 2;
        portal.className = "summon-portal";
        portal.style.left = `${x}px`;
        portal.style.top = `${y}px`;
        portal.style.width = `${size}px`;
        portal.style.height = `${size}px`;
        portal.style.color = color;
        _arena.appendChild(portal);
        setTimeout(() => portal.remove(), 860);

        for (let i = 0; i < 8; i++) {
            const sp = document.createElement("div");
            const a = (Math.PI * 2 * i) / 8;
            const dist = _battle.ballSize * 0.8;
            sp.className = "summon-sparkle";
            sp.style.left = `${x}px`;
            sp.style.top = `${y}px`;
            sp.style.color = color;
            sp.style.setProperty("--sx", `${Math.cos(a) * dist}px`);
            sp.style.setProperty("--sy", `${Math.sin(a) * dist}px`);
            sp.style.animationDelay = `${i * 50}ms`;
            _arena.appendChild(sp);
            setTimeout(() => sp.remove(), 700);
        }
    };

    // 이지훈 - 집착 추적 하트 파티클
    window.heartChase = function (fromX, fromY, toX, toY, color) {
        const hearts = ["💕", "💗", "💖", "❤️"];
        for (let i = 0; i < 4; i++) {
            const h = document.createElement("div");
            const mx = (toX - fromX) * 0.5 + (Math.random() - 0.5) * 40;
            const my = (toY - fromY) * 0.5 + (Math.random() - 0.5) * 40;
            h.className = "heart-particle";
            h.style.left = `${fromX}px`;
            h.style.top = `${fromY}px`;
            h.style.setProperty("--hx", `${mx}px`);
            h.style.setProperty("--hy", `${my}px`);
            h.style.animationDelay = `${i * 100}ms`;
            h.textContent = hearts[i];
            _arena.appendChild(h);
            setTimeout(() => h.remove(), 950);
        }
    };

    // 허율 - 스킬 도둑 글리치 스캔
    window.glitchScan = function (x, y, size, color) {
        for (let i = 0; i < 5; i++) {
            const line = document.createElement("div");
            const yOff = (i - 2) * (size / 5);
            line.className = "glitch-line";
            line.style.left = `${x - size / 2}px`;
            line.style.top = `${y + yOff}px`;
            line.style.width = `${size}px`;
            line.style.color = color;
            line.style.setProperty("--gy", `${yOff}px`);
            line.style.animationDelay = `${i * 40}ms`;
            _arena.appendChild(line);
            setTimeout(() => line.remove(), 460);
        }
        for (let i = 0; i < 4; i++) {
            const block = document.createElement("div");
            const bw = 10 + Math.random() * 30;
            const bh = 4 + Math.random() * 8;
            block.className = "glitch-block";
            block.style.left = `${x}px`;
            block.style.top = `${y}px`;
            block.style.width = `${bw}px`;
            block.style.height = `${bh}px`;
            block.style.color = color;
            block.style.setProperty("--gx", `${(Math.random() - 0.5) * size}px`);
            block.style.setProperty("--gbx", `${(Math.random() - 0.5) * size}px`);
            block.style.animationDelay = `${i * 60}ms`;
            _arena.appendChild(block);
            setTimeout(() => block.remove(), 360);
        }
    };

    // 허재민 - 뭉개뭉개 구름 확산
    window.cloudPuff = function (x, y, radius, color) {
        for (let i = 0; i < 8; i++) {
            const cl = document.createElement("div");
            const a = (Math.PI * 2 * i) / 8;
            const dist = radius * 0.4 + Math.random() * radius * 0.4;
            const sz = 20 + Math.random() * 25;
            cl.className = "cloud-particle";
            cl.style.left = `${x}px`;
            cl.style.top = `${y}px`;
            cl.style.width = `${sz}px`;
            cl.style.height = `${sz}px`;
            cl.style.color = color;
            cl.style.setProperty("--cx", `${Math.cos(a) * dist}px`);
            cl.style.setProperty("--cy", `${Math.sin(a) * dist}px`);
            cl.style.animationDelay = `${Math.random() * 200}ms`;
            _arena.appendChild(cl);
            setTimeout(() => cl.remove(), 960);
        }
    };

    // 허재민 - 둔화 대상 소용돌이
    window.slowSpiral = function (x, y, color) {
        const sp = document.createElement("div");
        const size = _battle.ballSize * 1.6;
        sp.className = "slow-spiral";
        sp.style.left = `${x}px`;
        sp.style.top = `${y}px`;
        sp.style.width = `${size}px`;
        sp.style.height = `${size}px`;
        sp.style.color = color;
        _arena.appendChild(sp);
        setTimeout(() => sp.remove(), 700);
    };

    // 김준모 - 공안 호출 경광등
    window.sirenFlash = function (x, y) {
        const siren = document.createElement("div");
        const size = _battle.ballSize * 2.2;
        siren.className = "siren-light";
        siren.style.left = `${x}px`;
        siren.style.top = `${y}px`;
        siren.style.width = `${size}px`;
        siren.style.height = `${size}px`;
        siren.style.transform = "translate(-50%,-50%)";
        _arena.appendChild(siren);
        setTimeout(() => siren.remove(), 660);

        const net = document.createElement("div");
        const nSize = _battle.ballSize * 1.8;
        net.className = "arrest-net";
        net.style.left = `${x}px`;
        net.style.top = `${y}px`;
        net.style.width = `${nSize}px`;
        net.style.height = `${nSize}px`;
        net.style.color = "#dc2626";
        _arena.appendChild(net);
        setTimeout(() => net.remove(), 550);
    };

    // 최해진 - 뒷치기 은신 사라짐
    window.stealthFade = function (x, y, color) {
        for (let i = 0; i < 4; i++) {
            const ghost = document.createElement("div");
            const a = (Math.PI * 2 * i) / 4 + Math.random() * 0.5;
            const dist = 20 + Math.random() * 30;
            ghost.className = "stealth-ghost";
            ghost.style.left = `${x}px`;
            ghost.style.top = `${y}px`;
            ghost.style.width = `${_battle.ballSize * 0.8}px`;
            ghost.style.height = `${_battle.ballSize * 0.8}px`;
            ghost.style.color = color;
            ghost.style.setProperty("--fx", `${Math.cos(a) * dist}px`);
            ghost.style.setProperty("--fy", `${Math.sin(a) * dist}px`);
            ghost.style.animationDelay = `${i * 60}ms`;
            _arena.appendChild(ghost);
            setTimeout(() => ghost.remove(), 560);
        }
    };

    // 최해진 - 뒷치기 등장 칼날 번쩍
    window.stealthReveal = function (x, y, color) {
        for (let i = 0; i < 3; i++) {
            const blade = document.createElement("div");
            const rot = -30 + i * 30 + (Math.random() - 0.5) * 20;
            blade.className = "blade-flash";
            blade.style.left = `${x}px`;
            blade.style.top = `${y}px`;
            blade.style.color = color;
            blade.style.setProperty("--br", `${rot}deg`);
            blade.style.animationDelay = `${i * 60}ms`;
            _arena.appendChild(blade);
            setTimeout(() => blade.remove(), 420);
        }
    };

    // 강현우 - 대시 먼지
    window.dustKick = function (x, y, color) {
        for (let i = 0; i < 5; i++) {
            const dust = document.createElement("div");
            const sz = 8 + Math.random() * 10;
            const a = Math.random() * Math.PI * 2;
            const dist = 10 + Math.random() * 20;
            dust.className = "dust-puff";
            dust.style.left = `${x}px`;
            dust.style.top = `${y}px`;
            dust.style.width = `${sz}px`;
            dust.style.height = `${sz}px`;
            dust.style.color = color;
            dust.style.setProperty("--ddx", `${Math.cos(a) * dist}px`);
            dust.style.setProperty("--ddy", `${Math.sin(a) * dist}px`);
            dust.style.animationDelay = `${Math.random() * 150}ms`;
            _arena.appendChild(dust);
            setTimeout(() => dust.remove(), 560);
        }
    };

    // 임신규 - 폭탄 째깍 펄스
    window.bombPulseEffect = function (x, y, color) {
        const ring = document.createElement("div");
        const size = _battle.ballSize * 1.4;
        ring.className = "bomb-pulse-ring";
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.color = color;
        _arena.appendChild(ring);
        setTimeout(() => ring.remove(), 450);
    };

    // 임신규 - 폭탄 폭발 화염 파편
    window.explosionFire = function (x, y, radius, color) {
        const flash = document.createElement("div");
        flash.className = "explosion-flash-ring";
        flash.style.left = `${x}px`;
        flash.style.top = `${y}px`;
        flash.style.width = `${radius * 2}px`;
        flash.style.height = `${radius * 2}px`;
        flash.style.color = color;
        _arena.appendChild(flash);
        setTimeout(() => flash.remove(), 560);

        const colors = [color, "#fbbf24", "#f97316", "#ef4444"];
        for (let i = 0; i < 10; i++) {
            const em = document.createElement("div");
            const a = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.3;
            const dist = radius * 0.3 + Math.random() * radius * 0.6;
            em.className = "explosion-ember";
            em.style.left = `${x}px`;
            em.style.top = `${y}px`;
            em.style.color = colors[i % colors.length];
            em.style.setProperty("--ex", `${Math.cos(a) * dist}px`);
            em.style.setProperty("--ey", `${Math.sin(a) * dist}px`);
            em.style.animationDelay = `${Math.random() * 100}ms`;
            _arena.appendChild(em);
            setTimeout(() => em.remove(), 660);
        }
    };
})();
