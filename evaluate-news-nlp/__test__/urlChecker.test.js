import {validURL} from './src/client/js/urlCheck'


describe('Testing the existence of function "validURL()"' , () => {
    test('Should return true', async () => {
        expect(validURL).toBeDefined();
    });
});
describe('Test, the function "validURL()" should be a function' , () => {
    test('Should return a function', async () => {
        expect(typeof validURL).toBe("function");
    });
});

describe('Test, the function "validURL()" for valid url' , () => {
    var url = "https://www.skillsyouneed.com/ips/dealing-with-criticism.html";
    test('Should return true', async () => {
        const response = validURL(url);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});
describe('Test "validURL()" for invalid url' , () => {
    var url = "htpshttps://www.skillsyouneed.com/ips/dealing-with-criticism.html";
    test('Should return false', async () => {
        const response = validURL(url);
        expect(response).toBeDefined();
        expect(response).toBe(false);
    });
});