import { main1, main3, main4, main5 } from "../../src/functions/userdata/handler"
// main1 == create user
// main3 == all user
// main4 == update user
let body = <any>{
    body: {
        ID: "123",
        email: "user@gmail.com",
        password: "user"
    }
}



test("Entered Correct Body. Event should return 200, with a body Object", async () => {
    const test: any = await main1(body, null, null);
    expect(test.statusCode).toBe(200);
});

test("Entered Correct Body. Event should return 200, with a body Object", async () => {
    const test: any = await main3(body, null, null);
    expect(test.statusCode).toBe(200);
});

test("Entered Correct Body. Event should return 200, with a body Object", async () => {
    const test: any = await main4(body, null, null);
    expect(test.statusCode).toBe(200);
});

test("Entered Correct Body. Event should return 200, with a body Object", async () => {
    const test: any = await main5(body, null, null);
    expect(test.statusCode).toBe(200);
});






