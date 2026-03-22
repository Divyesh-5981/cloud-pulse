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

export const UPDATE_INCIDENT_STATUS = gql`
  mutation UpdateIncidentStatus($id: String!, $status: String!) {
    updateIncidentStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;

export const CREATE_INCIDENT = gql`
  mutation CreateIncident(
    $title: String!
    $description: String!
    $serviceName: String!
    $severity: String!
    $assignee: String!
  ) {
    createIncident(
      title: $title
      description: $description
      serviceName: $serviceName
      severity: $severity
      assignee: $assignee
    ) {
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
  }
`;
