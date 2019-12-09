import { gql } from "apollo-boost";

const getOwnerProfileQuery = gql`
  query ownerProfilefetch($email: String) {
    ownerProfilefetch(email: $email) {
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

const getCustomerProfileQuery = gql`
  query CustomerProfilefetch($email: String) {
    customerProfilefetch(email: $email) {
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

const getSections = gql`
  query SectionFetch($email: String) {
    sectionFetch(email: $email) {
      sections {
        section_name
        items {
          itemName
          itemDescription
          price
        }
        email
        _id
      }
    }
  }
`;
const getAllSections = gql`
  query AllSectionFetch {
    allSectionFetch {
      sections {
        section_name
        items {
          itemName
          itemDescription
          price
        }
        email
        _id
      }
    }
  }
`;
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
export {
  getOwnerProfileQuery,
  getCustomerProfileQuery,
  getAuthorsQuery,
  getBooksQuery,
  getSections,
  getAllSections
};
