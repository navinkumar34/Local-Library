const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {

// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

//moment(this.due_back).format('MMMM Do, YYYY')

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's DOB
AuthorSchema
.virtual('DOB')
.get(function(){
  if(this.date_of_birth == null)
  return "";
  return moment(this.date_of_birth).format('MMMM Do, YYYY');
});

// Virtual for author's DOD
AuthorSchema
.virtual('DOD')
.get(function(){
  if(this.date_of_birth == null)
  return "";
  if(this.date_of_death == null)
  return "alive";
  return moment(this.date_of_death).format('MMMM Do, YYYY');
});


//Export model
module.exports = mongoose.model('Author', AuthorSchema);