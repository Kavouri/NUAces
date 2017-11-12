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
    if (typeof this.user != 'object') throw new Error('expected user object');
    if (!this.address || !this.college) {
      // TODO add address and college to reg form
      // throw new Error('expected valid address and college');
    }
    return true;
  }

  getInsertQuery() {
    return `INSERT INTO students (userId, address, college) VALUES
      (${this.user.id}, '${this.address}', '${this.college}')`;
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
