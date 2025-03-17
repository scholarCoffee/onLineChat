export  const generateRandomNickname = () => {
    const adjectives = ['快乐的', '悲伤的', '愤怒的', '兴奋的', '勇敢的'];
    const animals = ['猫', '狗', '兔子', '老虎', '狮子'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adjective}${animal}`;
};