// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    updateLastModified();
    initializeRandomHomepage();
});

// 导航功能
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            
            // 显示对应部分
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // 移动端收起菜单
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}

// 滚动效果
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.research-card, .project-card, .fun-item, .contact-method');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 更新最后修改时间
function updateLastModified() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        };
        lastUpdatedElement.textContent = now.toLocaleDateString('zh-CN', options);
    }
}

// 移动端菜单控制
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
}

function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('mobile-open');
}

// 展开/收起功能
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const button = content.previousElementSibling;
    const icon = button.querySelector('i');
    
    content.classList.toggle('expanded');
    
    if (content.classList.contains('expanded')) {
        icon.style.transform = 'rotate(180deg)';
        button.textContent = '收起...';
        button.insertBefore(icon, button.firstChild);
    } else {
        icon.style.transform = 'rotate(0deg)';
        button.textContent = '更多有趣的事实...';
        button.insertBefore(icon, button.firstChild);
    }
}

// 随机访问朋友主页功能
function initializeRandomHomepage() {
    const friendHomepages = [
        'https://example1.github.io',
        'https://example2.github.io',
        'https://example3.github.io',
        // 添加更多朋友的主页
    ];
    
    window.visitRandomHomepage = function() {
        if (friendHomepages.length > 0) {
            const randomIndex = Math.floor(Math.random() * friendHomepages.length);
            window.open(friendHomepages[randomIndex], '_blank');
        } else {
            alert('暂时没有添加朋友的主页链接 😅');
        }
    };
}

// 平滑滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 打字机效果（可选）
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 主题切换功能（可选扩展）
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // 保存主题偏好
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 加载保存的主题
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// 窗口大小变化处理
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// 外部链接在新标签页打开
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        e.target.target = '_blank';
        e.target.rel = 'noopener noreferrer';
    }
});

// 防止右键菜单（可选）
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '😴 回来看看我的主页吧！';
    } else {
        document.title = '你的名字 - 个人主页';
    }
});

// 添加一些动画效果
function addRandomAnimations() {
    const elements = document.querySelectorAll('.research-card, .project-card');
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in-up');
    });
}

// CSS动画类
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hover-scale {
        transition: transform 0.3s ease;
    }
    
    .hover-scale:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// 控制台彩蛋
console.log(`
%c🎉 欢迎来到我的个人主页！
%c如果你在查看源代码，说明你是一个有趣的人！
%c有任何问题或建议，欢迎联系我 😊

%c⭐ 技术栈：HTML5 + CSS3 + JavaScript + GitHub Pages
%c🚀 如果你也想制作这样的主页，可以参考我的代码！
`, 
'color: #8B4513; font-size: 16px; font-weight: bold;',
'color: #CD853F; font-size: 14px;',
'color: #D2B48C; font-size: 14px;',
'color: #5D4E37; font-size: 12px;',
'color: #8B7765; font-size: 12px;'
);
