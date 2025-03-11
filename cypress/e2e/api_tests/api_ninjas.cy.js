const { it } = require("mocha");

describe('API Ninjas Testing - Various API Features', () => {
    let testData;
    let testImage;

    before(() => {
        cy.fixture('fileDummyNinjaApi/dummyInput.json').then((data) => {
            testData = data;
        });

        cy.fixture('fileDummyNinjaApi/sample.png', 'base64').then((fileContent) => {
            testImage = Cypress.Blob.base64StringToBlob(fileContent, 'image/png');
        });
    });

    beforeEach(() => {
        cy.log("🔄 Starting API Ninja Test...");
    });

    it('[TC-001] GET - DNS Lookup for a domain', () => {
        cy.apiNinjaRequestGET("dnslookup?domain=example.com").then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array").and.not.be.empty;
        });
    });

    it('[TC-002] GET - IP Lookup for an IP Address', () => {
        cy.apiNinjaRequestGET(`iplookup?address=${testData.ipLookupAddress}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('city').that.is.a('string');
            expect(response.body).to.have.property('country').that.is.a('string');
        });
    });

    it('[TC-003] GET - Generate a random password', () => {
        cy.apiNinjaRequestGET(`passwordgenerator?length=${testData.passwordLength}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('random_password').that.is.a('string').and.has.length(testData.passwordLength);
        });
    });

    it('[TC-004] GET - Generate a QR code', () => {
        cy.apiNinjaRequestGET(`qrcode?format=png&data=https://api-ninjas.com`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('image/png');
        });
    });

    it('[TC-005] GET - URL Lookup', () => {
        cy.apiNinjaRequestGET(`urllookup?url=${testData.urlLookup}`).then((response) => {
            expect(response.status).to.eq(200);
    
            // Pastikan response memiliki properti yang benar dan cocok dengan nilai yang diharapkan
            expect(response.body).to.have.property('is_valid').that.is.a('boolean').and.eq(true);
            expect(response.body).to.have.property('country').that.is.a('string').and.eq('United States');
            expect(response.body).to.have.property('country_code').that.is.a('string').and.eq('US');
            expect(response.body).to.have.property('region_code').that.is.a('string').and.eq('WA');
            expect(response.body).to.have.property('region').that.is.a('string').and.eq('Washington');
            expect(response.body).to.have.property('city').that.is.a('string').and.eq('Seattle');
            expect(response.body).to.have.property('zip').that.is.a('string').and.eq('98111');
            expect(response.body).to.have.property('lat').that.is.a('number').and.eq(47.6061);
            expect(response.body).to.have.property('lon').that.is.a('number').and.eq(-122.333);
            expect(response.body).to.have.property('timezone').that.is.a('string').and.eq('America/Los_Angeles');
            expect(response.body).to.have.property('isp').that.is.a('string').and.eq('Google LLC');
            expect(response.body).to.have.property('url').that.is.a('string').and.contains(testData.urlLookup);
        });
    });
    

    it('[TC-006] GET - User Agent Details', () => {
        cy.apiNinjaRequestGET(`useragentparse?useragent=${testData.userAgentString}`).then((response) => {
            expect(response.status).to.eq(200);
    
            // Validasi properti browser
            expect(response.body).to.have.property('browser');
            expect(response.body.browser).to.have.property('family').that.is.a('string').and.eq('Chrome');
            expect(response.body.browser).to.have.property('version').that.is.a('string').and.eq('41.0.2272');
    
            // Validasi properti OS
            expect(response.body).to.have.property('os');
            expect(response.body.os).to.have.property('family').that.is.a('string').and.eq('Mac OS X');
            expect(response.body.os).to.have.property('version').that.is.a('string').and.eq('10.9.4');
    
            // Validasi properti device
            expect(response.body).to.have.property('device');
            expect(response.body.device).to.have.property('family').that.is.a('string').and.eq('Mac');
            expect(response.body.device).to.have.property('brand').that.is.a('string').and.eq('Apple');
            expect(response.body.device).to.have.property('model').that.is.a('string').and.eq('Mac');
    
            // Validasi properti boolean
            expect(response.body).to.have.property('is_mobile').that.is.a('boolean').and.eq(true);
            expect(response.body).to.have.property('is_tablet').that.is.a('boolean').and.eq(false);
            expect(response.body).to.have.property('is_pc').that.is.a('boolean').and.eq(false);
            expect(response.body).to.have.property('is_bot').that.is.a('boolean').and.eq(false);
        });
    });
    

    it('[TC-007] GET - Validate phone number', () => {
        cy.apiNinjaRequestGET(`validatephone?number=${testData.phoneNumber}`).then((response) => {
            expect(response.status).to.eq(200);
    
            // Validasi properti boolean
            expect(response.body).to.have.property('is_valid').that.is.a('boolean').and.eq(true);
            expect(response.body).to.have.property('is_formatted_properly').that.is.a('boolean').and.eq(true);
    
            // Validasi properti country & location
            expect(response.body).to.have.property('country').that.is.a('string').and.eq('Indonesia');
            expect(response.body).to.have.property('location').that.is.a('string').and.eq('Indonesia');
    
            // Validasi timezone (array)
            expect(response.body).to.have.property('timezones').that.is.an('array').and.deep.eq(['Asia/Jakarta']);
    
            // Validasi format nomor telepon
            expect(response.body).to.have.property('format_national').that.is.a('string').and.eq('0812-3456-7890');
            expect(response.body).to.have.property('format_international').that.is.a('string').and.eq('+62 812-3456-7890');
            expect(response.body).to.have.property('format_e164').that.is.a('string').and.eq('+6281234567890');
    
            // Validasi kode negara
            expect(response.body).to.have.property('country_code').that.is.a('number').and.eq(62);
        });
    });
    

    it('[TC-008] GET - Validate email address', () => {
        cy.apiNinjaRequestGET(`validateemail?email=${testData.emailAddress}`).then((response) => {
            expect(response.status).to.eq(200);
            // Validasi domain dan email
            expect(response.body).to.have.property('is_valid').that.is.a('boolean').and.eq(true);
            expect(response.body).to.have.property('domain').that.is.a('string').and.eq('api-ninjas.com');
            expect(response.body).to.have.property('email').that.is.a('string').and.eq('info@api-ninjas.com');
        });
    });
    

    it('[TC-009] GET - Scrape website content', () => {
        cy.apiNinjaRequestGET(`webscraper?url=${testData.webScraperUrl}`).then((response) => {
            expect(response.status).to.eq(200);
    
            // Memastikan properti 'data' ada dan merupakan string
            expect(response.body).to.have.property('data').that.is.a('string').and.not.be.empty;
    
            // Memeriksa apakah konten yang diambil mengandung elemen HTML utama
            expect(response.body.data).to.include('<!doctype html>');
            expect(response.body.data).to.include('<html>');
            expect(response.body.data).to.include('<head>');
            expect(response.body.data).to.include('<title>Example Domain</title>');
            expect(response.body.data).to.include('<body>');
            expect(response.body.data).to.include('<h1>Example Domain</h1>');
            expect(response.body.data).to.include('<p>This domain is for use in illustrative examples in documents.');
            expect(response.body.data).to.include('</html>');
        });
    });
    

    it('[TC-010] POST - Generate Embeddings', () => {
        cy.apiNinjaRequestPOST('embeddings', { text: testData.embeddingText }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.embeddings).to.have.length.within(600, 1000); // Sesuaikan dengan ekspektasi
        });
    });

    it('[TC-011] POST - Face Detection', () => {
        const formData = new FormData();
        formData.append('image', testImage, 'sample.png');

        cy.apiNinjaRequestPOST('facedetect', formData, { 
            'Content-Type': 'multipart/form-data'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('[TC-012] POST - Convert image to text', () => {
        const formData = new FormData();
        formData.append('image', testImage, 'sample.png');

        cy.apiNinjaRequestPOST('imagetotext', formData, { 
            'Content-Type': 'multipart/form-data'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('[TC-013] POST - Detect objects in an image', () => {
        const formData = new FormData();
        formData.append('image', testImage, 'sample.png');

        cy.apiNinjaRequestPOST('objectdetection', formData, { 
            'Content-Type': 'multipart/form-data'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('[TC-014] GET - Analyze sentiment of text', () => {
        cy.apiNinjaRequestGET(`sentiment?text=${testData.sentimentText}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('sentiment').that.is.a('string');
        });
    });

    it('[TC-015] POST - Compare text similarity', () => {
        cy.apiNinjaRequestPOST('textsimilarity', { 
            text_1: testData.textSimilarity.text1, 
            text_2: testData.textSimilarity.text2 
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('similarity').to.be.closeTo(0.8, 0.09);
        });
    });
});
