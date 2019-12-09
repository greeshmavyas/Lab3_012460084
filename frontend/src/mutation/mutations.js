import { gql } from "apollo-boost";

const addBookMutation = gql`
  mutation AddBook($name: String, $genre: String, $authorId: ID) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
const ownerSignUpMutation = gql`
  mutation OwnerSignUp(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
    $rname: String
    $cuisine: String
    $zipcode: String
  ) {
    ownerSignUp(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      rname: $rname
      cuisine: $cuisine
      zipcode: $zipcode
    ) {
      cookie1
      cookie2
      cookie3
      cookie4
      status
      message
    }
  }
`;

const customerSignUpMutation = gql`
  mutation CustomerSignUp(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
  ) {
    customerSignUp(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      cookie1
      cookie2
      cookie3
      cookie4
      status
      message
    }
  }
`;

const ownerLoginMutation = gql`
  mutation OwnerLogin($email: String, $password: String) {
    ownerLogin(email: $email, password: $password) {
      cookie1
      cookie2
      cookie3
      cookie4
      status
      message
    }
  }
`;

const customerLoginMutation = gql`
  mutation CustomerLogin($email: String, $password: String) {
    customerLogin(email: $email, password: $password) {
      cookie1
      cookie2
      cookie3
      cookie4
      status
      message
    }
  }
`;
const customerProfileSaveMutation = gql`
  mutation CustomerProfileSave(
    $firstname: String
    $lastname: String
    $email: String
    $phone: String
  ) {
    customerProfileSave(
      firstname: $firstname
      lastname: $lastname
      email: $email
      phone: $phone
    ) {
      customerId
      firstname
      lastname
      email
      phone
      status
      message
    }
  }
`;
const ownerProfileSaveMutation = gql`
  mutation OwnerProfileSave(
    $firstname: String
    $lastname: String
    $email: String
    $phone: String
    $rname: String
    $cuisine: String
    $zipcode: String
  ) {
    ownerProfileSave(
      firstname: $firstname
      lastname: $lastname
      email: $email
      phone: $phone
      rname: $rname
      cuisine: $cuisine
      zipcode: $zipcode
    ) {
      ownerId
      firstname
      lastname
      email
      phone
      rname
      cuisine
      zipcode
      restaurantId
      status
      message
    }
  }
`;

const addSectionMutation = gql`
  mutation AddSection($email: String, $section_name: String) {
    addSection(email: $email, section_name: $section_name) {
      _id
      section_name
      items {
        itemName
        itemDescription
        price
      }
      email
      status
      message
    }
  }
`;

const addItemMutation = gql`
  mutation AddItem(
    $email: String
    $section_name: String
    $itemName: String
    $itemDescription: String
    $price: String
  ) {
    addItem(
      email: $email
      section_name: $section_name
      itemName: $itemName
      itemDescription: $itemDescription
      price: $price
    ) {
      _id
      section_name
      items {
        itemName
        itemDescription
        price
      }
      email
      status
      message
    }
  }
`;

export {
  addBookMutation,
  ownerSignUpMutation,
  customerSignUpMutation,
  ownerLoginMutation,
  customerLoginMutation,
  customerProfileSaveMutation,
  ownerProfileSaveMutation,
  addSectionMutation,
  addItemMutation
};
