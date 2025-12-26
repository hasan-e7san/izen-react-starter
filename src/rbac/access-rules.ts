export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum Resource {
  Undefined = "d.e.f.a.u.l.t",
  Auth = "auth",
  Users = "users",
  UserGroups = "user-groups",
  Clients = "clients",
  Shared = "shared",
  Reports = "reports",
  Preferences = "preferences",
  Locations = "locations",
  IssueTypes = "issue-types",
  Checkpoint = "checkpoints",
  LocationShift = "location",
  Employees = "employees",
  EmployeeAvailabilities = "employee-availabilities",
  EmployeeShift = "employee-shifts",
  UserDevice = "user-devices",
  EmployeeShift_SelfSchedule = "employee-shifts/self-schedule",
  Map = "map",
  Issue = "issues",
}

export enum Role {
  Admin = "admin",
  Manager = "manager",
  Reader = "reader",
  Client = "client",
}

export const RolesNames = [
  { label: "Admin", value: Role.Admin },
  { label: "Manager", value: Role.Manager },
  { label: "Viewer", value: Role.Reader },
  { label: "Client", value: Role.Client }
];

interface Rule {
  can: string | string[];
  cannot?: string[];
}

type RoleRules = {
  [key in Action]?: Rule;
}

type Rules = {
  [key in Role]?: RoleRules;
}

export const rules: Rules = {
  [Role.Admin]: {
    [Action.Manage]: { can: "all" },
    [Action.Create]: { can: "all" },
    [Action.Read]: { can: "all" },
    [Action.Update]: { can: "all" },
    [Action.Delete]: { can: "all" },
  },
  [Role.Manager]: {
    [Action.Manage]: {
      can: [
        Resource.Users,
        Resource.Preferences,
        Resource.Clients,
        Resource.Shared,
        Resource.IssueTypes,
        Resource.Checkpoint,
        Resource.UserDevice,
        Resource.Reports,
        Resource.Map,
        Resource.Locations
      ]
    },
    [Action.Create]: {
      can: [
        Resource.Users,
        Resource.Preferences,
        Resource.Clients,
        Resource.Shared,
        Resource.IssueTypes,
        Resource.Checkpoint,
        Resource.UserDevice,
        Resource.Reports,
        Resource.Map,
        Resource.Locations
      ]
    },
    [Action.Read]: {
      can: [
        Resource.Users,
        Resource.Preferences,
        Resource.Clients,
        Resource.Shared,
        Resource.IssueTypes,
        Resource.Checkpoint,
        Resource.UserDevice,
        Resource.Reports,
        Resource.Map,
        Resource.Locations
      ]
    },
    [Action.Update]: {
      can: [
        Resource.Users,
        Resource.Preferences,
        Resource.Clients,
        Resource.Shared,
        Resource.IssueTypes,
        Resource.Checkpoint,
        Resource.UserDevice,
        Resource.Reports,
        Resource.Map,
        Resource.Locations
      ]
    },
    [Action.Delete]: {
      can: [
        Resource.Users,
        Resource.Preferences,
        Resource.Clients,
        Resource.Shared,
        Resource.IssueTypes,
        Resource.Checkpoint,
        Resource.UserDevice,
        Resource.Reports,
        Resource.Map,
        Resource.Locations
      ]
    },
  },
  [Role.Reader]: {
    [Action.Read]: {
      can: [
        Resource.Users,
        Resource.Preferences,
        Resource.Clients,
        Resource.Shared,
        Resource.Locations,
        Resource.IssueTypes,
        Resource.Checkpoint,
        Resource.UserDevice,
      ]
    },
  },
  [Role.Client]: {
    [Action.Manage]: {
      can: [Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared]
    },
    [Action.Create]: {
      can: [Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared]
    },
    [Action.Read]: {
      can: [Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared]
    },
    [Action.Update]: {
      can: [Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared]
    },
    [Action.Delete]: {
      can: [Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared]
    },
  },
}

export const userCan = (userRoles: Role[], action: Action, target: string): boolean => {
  for (const role of userRoles) {
    const roleRules = rules[role]
    
    if (target === Resource.Undefined) {
      return false
    }
    
    if (!roleRules) {
      return false;
    }
    
    const roleActionRules = roleRules[action];
    
    if (!roleActionRules) {
      return false;
    }
    
    if (
      (roleActionRules.can === "all" || roleActionRules.can.includes(target)) &&
      !roleActionRules.cannot?.includes(target)
    ) {
      return true;
    }
  }
  
  return false;
};
