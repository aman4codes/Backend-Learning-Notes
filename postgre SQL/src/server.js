const { createUserTable, insertUser,fetchAllUser, updateUserInfo, deleteInfo } = require("./concepts/basic_queries");

async function allbasic_queries() {
    try {
        // await createUserTable();
        //insertUser
        // const newUser = await insertUser("Aman4", "aman4@gmail.com");
        const allUser = await fetchAllUser();
        console.log("All users",allUser);

        await updateUserInfo("Aman","amannew@gmail.com");
        await deleteInfo("John Doe");
    } catch (e) {
        console.error(`A error occurred ${e}`);

    }
}

async function testAllQueries() {
    await allbasic_queries();
}

testAllQueries();