// 新手引导步骤
const guideSteps = [
  {
    target: '#quick-luck-section',
    text: '点击这里一键生成今日运势！',
  },
  {
    target: '#date-calculate-section',
    text: '选择事件类型，计算未来7天内的吉日。',
  },
  {
    target: '#invite-section',
    text: '邀请好友解锁更多功能！',
  },
];

let currentStep = 0;

// 显示引导
function showGuideStep(step) {
  const stepData = guideSteps[step];
  if (!stepData) {
    // 引导结束
    document.getElementById('guide-overlay').style.display = 'none';
    return;
  }

  // 高亮目标区域
  const targetElement = document.querySelector(stepData.target);
  targetElement.classList.add('highlight');

  // 显示引导文字
  document.getElementById('guide-text').innerText = stepData.text;

  // 显示引导内容
  document.getElementById('guide-overlay').style.display = 'flex';
}

// 下一步
document.getElementById('next-step').addEventListener('click', function () {
  const targetElement = document.querySelector(guideSteps[currentStep].target);
  targetElement.classList.remove('highlight');
  currentStep++;
  showGuideStep(currentStep);
});

// 跳过引导
document.getElementById('skip-guide').addEventListener('click', function () {
  document.getElementById('guide-overlay').style.display = 'none';
  const targetElement = document.querySelector(guideSteps[currentStep].target);
  targetElement.classList.remove('highlight');
});

// 初始化引导
showGuideStep(currentStep);

// 其他功能逻辑（保持不变）
document.getElementById('quick-luck').addEventListener('click', function () {
  const result = getDailyLuck();
  document.getElementById('quick-result').innerText = result;
  document.getElementById('share-section').style.display = 'block';
  document.getElementById('share-card').innerHTML = `
    <h3>今日运势</h3>
    <p>${result}</p>
    <p>财神位: 东南</p>
    <p>吉时: 09:00 - 11:00</p>
  `;
});

document.getElementById('calculate-date').addEventListener('click', function () {
  const eventType = document.getElementById('event-type').value;
  const result = calculateLuckyDates(eventType);
  document.getElementById('date-result').innerText = result;
});

document.getElementById('invite-friend').addEventListener('click', function () {
  const inviteLink = 'https://example.com/invite?ref=12345';
  document.getElementById('invite-link').innerText = `邀请链接：${inviteLink}`;
  document.getElementById('invite-link').style.display = 'block';
  alert('复制邀请链接发送给好友！');
});

function getDailyLuck() {
  const luckyTimes = {
    wealth: '09:00 - 11:00',
    sign: '13:00 - 15:00',
    travel: '07:00 - 09:00'
  };

  const directions = {
    wealth: '东南',
    sign: '正南',
    travel: '正东'
  };

  return `
    今日吉时：
    - 求财: ${luckyTimes.wealth} (财神位: ${directions.wealth})
    - 签约: ${luckyTimes.sign} (吉位: ${directions.sign})
    - 出行: ${luckyTimes.travel} (吉位: ${directions.travel})
  `;
}

function calculateLuckyDates(eventType) {
  const today = new Date();
  const luckyDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const isLucky = Math.random() > 0.5;
    if (isLucky) {
      luckyDates.push(date.toLocaleDateString());
    }
  }

  if (luckyDates.length === 0) {
    return '未来7天内无吉日，请谨慎选择。';
  }

  return `未来7天内适合${getEventName(eventType)}的吉日：\n${luckyDates.join('\n')}`;
}

function getEventName(eventType) {
  const eventNames = {
    marriage: '结婚',
    move: '搬家',
    open: '开业'
  };
  return eventNames[eventType] || '该事件';
}

// 生成唯一邀请链接
function generateInviteLink(userId) {
  const baseUrl = 'https://example.com/invite';
  return `${baseUrl}?ref=${userId}`;
}

// 复制链接到剪贴板
function copyToClipboard(text) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

// 邀请好友功能
document.getElementById('invite-friend').addEventListener('click', function () {
  // 模拟用户 ID（实际应用中可以从服务器获取）
  const userId = Math.random().toString(36).substring(7); // 生成随机用户 ID
  const inviteLink = generateInviteLink(userId);

  // 显示邀请链接
  const inviteLinkContainer = document.getElementById('invite-link-container');
  const inviteLinkInput = document.getElementById('invite-link');
  inviteLinkInput.value = inviteLink;
  inviteLinkContainer.style.display = 'block';

 
});

// 生成分享卡片内容
function generateShareCard(luck, direction, time) {
  document.getElementById('card-luck').innerText = luck;
  document.getElementById('card-direction').innerText = `财神位: ${direction}`;
  document.getElementById('card-time').innerText = `吉时: ${time}`;
}

// 复制分享内容
document.getElementById('share-button').addEventListener('click', function () {
  const cardContent = document.getElementById('card-content').innerText;
  copyToClipboard(cardContent);
  alert('分享内容已复制到剪贴板！');
});

// 保存为图片
document.getElementById('save-image').addEventListener('click', function () {
  const cardContent = document.getElementById('card-content');
  html2canvas(cardContent).then(canvas => {
    const link = document.createElement('a');
    link.download = '今日运势.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// 一键生成今日运势
document.getElementById('quick-luck').addEventListener('click', function () {
  const result = getDailyLuck();
  document.getElementById('quick-result').innerText = result;

  // 显示分享卡片
  document.getElementById('share-section').style.display = 'block';
  generateShareCard(
    result,
    '东南', // 财神位
    '09:00 - 11:00' // 吉时
  );
});

// 复制到剪贴板
function copyToClipboard(text) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

// 每日吉时查询逻辑
function getDailyLuck() {
  const luckyTimes = {
    wealth: '09:00 - 11:00',
    sign: '13:00 - 15:00',
    travel: '07:00 - 09:00'
  };

  const directions = {
    wealth: '东南',
    sign: '正南',
    travel: '正东'
  };

  return `
    今日吉时：
    - 求财: ${luckyTimes.wealth} (财神位: ${directions.wealth})
    - 签约: ${luckyTimes.sign} (吉位: ${directions.sign})
    - 出行: ${luckyTimes.travel} (吉位: ${directions.travel})
  `;
}

// Bitly API Token
const BITLY_API_TOKEN = '2e5ebe3e4e89ff126e45966cbc607b108328664a';

// 生成短链接
async function generateShortLink(longUrl) {
  const url = 'https://api-ssl.bitly.com/v4/shorten';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BITLY_API_TOKEN}`
    },
    body: JSON.stringify({
      long_url: longUrl,
      domain: 'bit.ly' // 使用 bit.ly 域名
    })
  });

  if (!response.ok) {
    throw new Error('生成短链接失败，请稍后重试。');
  }

  const data = await response.json();
  return data.link; // 返回生成的短链接
}

// 生成邀请链接
document.getElementById('invite-friend').addEventListener('click', async function () {
  const userId = Math.random().toString(36).substring(7); // 生成随机用户 ID
  const longUrl = `https://example.com/invite?ref=${userId}`; // 长链接
  const inviteLinkContainer = document.getElementById('invite-link-container');
  const inviteLinkInput = document.getElementById('invite-link');

  try {
    // 显示加载状态
    inviteLinkInput.value = '生成中...';
    inviteLinkContainer.style.display = 'block';

    // 生成短链接
    const shortUrl = await generateShortLink(longUrl);
    inviteLinkInput.value = shortUrl;

    // 复制链接
    document.getElementById('copy-link').addEventListener('click', function () {
      copyToClipboard(shortUrl);
      alert('短链接已复制到剪贴板！');
    });
  } catch (error) {
    alert(error.message); // 显示错误信息
    inviteLinkInput.value = '生成失败，请重试。';
  }
});

