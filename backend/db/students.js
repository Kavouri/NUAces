var query = require('./connect').query;

class Student {

  constructor(user, address, college) {
    this.user = user;
    this.address = address;
    this.college = college;
    
    // Bind methods to this
    this.getInsertQuery = this.getInsertQuery.bind(this);
    this.toPublicResponse = this.toPublicResponse.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.create = this.create.bind(this);
  }  

  create() {
    this.validateFields();
    return query(this.getInsertQuery());
  }

  validateFields() {
    // lets assert that user is not associated with a student or admin acc
    // TODO
    return true;
  }

  getInsertQuery() {
    return `INSERT INTO students (userId, address, college) VALUES
      ('${this.user.id}', '${this.address}', '${this.college}')`;
  }

  toPublicResponse() {
    return {
      'user': this.user.toPublicResponse(),
      'address': this.address,
      'college': this.college
    };
  }
}

exports.Student = Student;
