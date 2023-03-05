/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateSessionById = /* GraphQL */ `
  subscription OnUpdateSessionById($id: String!) {
    onUpdateSessionById(id: $id) {
      id
      owner
      name
      searchCity
      searchBounds {
        bottomLeft {
          lat
          lng
        }
        topRight {
          lat
          lng
        }
      }
      listings {
        id
        name
        address
        location {
          lat
          lng
        }
        price
        numberOfBedrooms
        numberOfBathrooms
        link
        notes
        pictures
        status
      }
      pointsOfInterest {
        id
        name
        type
        address
        location {
          lat
          lng
        }
      }
      roommates
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($owner: String) {
    onCreateSession(owner: $owner) {
      id
      owner
      name
      searchCity
      searchBounds {
        bottomLeft {
          lat
          lng
        }
        topRight {
          lat
          lng
        }
      }
      listings {
        id
        name
        address
        location {
          lat
          lng
        }
        price
        numberOfBedrooms
        numberOfBathrooms
        link
        notes
        pictures
        status
      }
      pointsOfInterest {
        id
        name
        type
        address
        location {
          lat
          lng
        }
      }
      roommates
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($owner: String) {
    onUpdateSession(owner: $owner) {
      id
      owner
      name
      searchCity
      searchBounds {
        bottomLeft {
          lat
          lng
        }
        topRight {
          lat
          lng
        }
      }
      listings {
        id
        name
        address
        location {
          lat
          lng
        }
        price
        numberOfBedrooms
        numberOfBathrooms
        link
        notes
        pictures
        status
      }
      pointsOfInterest {
        id
        name
        type
        address
        location {
          lat
          lng
        }
      }
      roommates
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($owner: String) {
    onDeleteSession(owner: $owner) {
      id
      owner
      name
      searchCity
      searchBounds {
        bottomLeft {
          lat
          lng
        }
        topRight {
          lat
          lng
        }
      }
      listings {
        id
        name
        address
        location {
          lat
          lng
        }
        price
        numberOfBedrooms
        numberOfBathrooms
        link
        notes
        pictures
        status
      }
      pointsOfInterest {
        id
        name
        type
        address
        location {
          lat
          lng
        }
      }
      roommates
      createdAt
      updatedAt
    }
  }
`;
