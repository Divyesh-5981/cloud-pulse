import { gql } from '@apollo/client';

export const GET_INCIDENTS = gql`
  query GetIncidents(
    $severity: [String!]
    $status: [String!]
    $serviceName: String
    $page: Int!
    $pageSize: Int!
  ) {
    incidents(
      severity: $severity
      status: $status
      serviceName: $serviceName
      page: $page
      pageSize: $pageSize
    ) {
      items {
        id
        title
        description
        serviceName
        severity
        status
        assignee
        createdAt
        updatedAt
        notes
      }
      totalCount
    }
  }
`;

export const UPDATE_INCIDENT_NOTES = gql`
  mutation UpdateIncidentNotes($id: String!, $notes: String!) {
    updateIncidentNotes(id: $id, notes: $notes) {
      id
      notes
      updatedAt
    }
  }
`;
