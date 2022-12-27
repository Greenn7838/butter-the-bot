module.exports = (client) => {
    console.log(`${client.user.tag} is ready!!`);
    client.user.setActivity({ name: 'b! | Butter Bot' });
}