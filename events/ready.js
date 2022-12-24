module.exports = (client) => {
    console.log(`${client.user.tag} is ready!!\n`);
    client.user.setActivity({ name: 'b! | Butter Bot' });
}