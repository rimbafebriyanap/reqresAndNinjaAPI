describe('Reqres API Testing - CRUD & Negative Cases', () => {
    let userId = 2; // Dynamic user ID

    beforeEach(() => {
        cy.log("🔄 Starting Test Case...");
    });

    it('01 - GET: Retrieve user list (Status 200)', () => {
        cy.makeRequest('GET', `/users?page=2`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data').that.is.an('array');
        });
    });

    it('02 - GET: Retrieve a user by ID (Status 200)', () => {
        cy.makeRequest('GET', `/users/${userId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('id', userId);
        });
    });

    it('03 - GET: Try to retrieve a non-existing user (Status 404)', () => {
        cy.makeRequest('GET', `/users/1000`, {}, false).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('04 - POST: Create a new user with valid data (Status 201)', () => {
        const newUser = { name: "John Doe", job: "Tester" };
        cy.makeRequest('POST', `/users`, newUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.include(newUser);
        });
    });

    it('05 - POST: Create a user with incomplete data (Status 400)', () => {
        cy.makeRequest('POST', `/users`, {}, false).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('06 - PUT: Update user data with valid information (Status 200)', () => {
        const updatedUser = { name: "Updated Name", job: "Updated Job" };
        cy.makeRequest('PUT', `/users/${userId}`, updatedUser).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('job', updatedUser.job);
        });
    });

    it('07 - PUT: Update a non-existing user (Status 200, still successful)', () => {
        cy.makeRequest('PUT', `/users/9999`, { name: "Ghost", job: "No Job" }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('08 - DELETE: Remove an existing user (Status 204)', () => {
        cy.makeRequest('DELETE', `/users/${userId}`).then((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it('09 - DELETE: Try to remove a non-existing user (Status 204, still successful)', () => {
        cy.makeRequest('DELETE', `/users/9999`).then((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it('10 - GET: Try to retrieve an unavailable user page (Status 200 with empty data)', () => {
        cy.makeRequest('GET', `/users?page=100`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array').that.is.empty;
        });
    });

    it('11 - GET: Validate response headers (Content-Type application/json)', () => {
        cy.makeRequest('GET', `/users/${userId}`).then((response) => {
            expect(response.headers['content-type']).to.include('application/json');
        });
    });

    it('12 - GET: Validate response structure for user list', () => {
        cy.makeRequest('GET', `/users?page=1`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data').that.is.an('array');
            response.body.data.forEach(user => {
                expect(user).to.have.property('id');
                expect(user).to.have.property('email');
                expect(user).to.have.property('first_name');
                expect(user).to.have.property('last_name');
            });
        });
    });
});
