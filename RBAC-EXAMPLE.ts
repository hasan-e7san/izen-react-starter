// Example: How to configure and use the new RBAC system
// This file shows a complete example of setting up RBAC in your application

import { RBACConfig, CommonActions } from 'izen-react-starter';

// ============================================
// Step 1: Define your application's resources
// ============================================
export const AppResources = {
  // Authentication & Profile
  Auth: 'auth',
  Profile: 'profile',
  
  // Content Management
  Posts: 'posts',
  Pages: 'pages',
  Comments: 'comments',
  Media: 'media',
  
  // User Management
  Users: 'users',
  UserGroups: 'user-groups',
  
  // Settings
  Settings: 'settings',
  Preferences: 'preferences',
  
  // Analytics & Reports
  Reports: 'reports',
  Analytics: 'analytics',
  Dashboard: 'dashboard',
  
  // Add more resources as needed
} as const;

// ============================================
// Step 2: Define your application's roles
// ============================================
export const AppRoles = {
  SuperAdmin: 'super-admin',
  Admin: 'admin',
  Editor: 'editor',
  Author: 'author',
  Contributor: 'contributor',
  Viewer: 'viewer',
} as const;

// ============================================
// Step 3: Define custom actions (optional)
// ============================================
// You can extend CommonActions with custom actions
export const AppActions = {
  ...CommonActions,
  Publish: 'publish',
  Archive: 'archive',
  Export: 'export',
  Import: 'import',
  Approve: 'approve',
  Reject: 'reject',
} as const;

// ============================================
// Step 4: Create your RBAC configuration
// ============================================
export const rbacConfig: RBACConfig = {
  roles: Object.values(AppRoles),
  resources: Object.values(AppResources),
  defaultResource: 'default', // Used for undefined resources
  
  // Optional: Display labels for roles (useful for UI dropdowns)
  roleLabels: [
    { label: 'Super Administrator', value: AppRoles.SuperAdmin },
    { label: 'Administrator', value: AppRoles.Admin },
    { label: 'Editor', value: AppRoles.Editor },
    { label: 'Author', value: AppRoles.Author },
    { label: 'Contributor', value: AppRoles.Contributor },
    { label: 'Viewer', value: AppRoles.Viewer },
  ],
  
  // Define permission rules for each role
  rules: {
    // Super Admin - Full access to everything
    [AppRoles.SuperAdmin]: {
      [AppActions.Manage]: { can: 'all' },
      [AppActions.Create]: { can: 'all' },
      [AppActions.Read]: { can: 'all' },
      [AppActions.Update]: { can: 'all' },
      [AppActions.Delete]: { can: 'all' },
      [AppActions.Publish]: { can: 'all' },
      [AppActions.Archive]: { can: 'all' },
      [AppActions.Export]: { can: 'all' },
      [AppActions.Import]: { can: 'all' },
      [AppActions.Approve]: { can: 'all' },
      [AppActions.Reject]: { can: 'all' },
    },
    
    // Admin - Almost everything, except some system settings
    [AppRoles.Admin]: {
      [AppActions.Manage]: { 
        can: 'all',
        cannot: [AppResources.Settings] // Can't modify system settings
      },
      [AppActions.Create]: { can: 'all' },
      [AppActions.Read]: { can: 'all' },
      [AppActions.Update]: { 
        can: 'all',
        cannot: [AppResources.Settings]
      },
      [AppActions.Delete]: { 
        can: 'all',
        cannot: [AppResources.Users, AppResources.Settings] // Can't delete users or settings
      },
      [AppActions.Publish]: { can: 'all' },
      [AppActions.Archive]: { can: 'all' },
      [AppActions.Export]: { can: 'all' },
      [AppActions.Import]: { can: 'all' },
      [AppActions.Approve]: { can: 'all' },
    },
    
    // Editor - Can manage content and moderate comments
    [AppRoles.Editor]: {
      [AppActions.Create]: { 
        can: [
          AppResources.Posts, 
          AppResources.Pages, 
          AppResources.Comments,
          AppResources.Media
        ] 
      },
      [AppActions.Read]: { can: 'all' },
      [AppActions.Update]: { 
        can: [
          AppResources.Posts, 
          AppResources.Pages, 
          AppResources.Comments,
          AppResources.Media,
          AppResources.Profile
        ] 
      },
      [AppActions.Delete]: { 
        can: [
          AppResources.Posts,
          AppResources.Comments,
          AppResources.Media
        ] 
      },
      [AppActions.Publish]: { 
        can: [AppResources.Posts, AppResources.Pages] 
      },
      [AppActions.Archive]: { 
        can: [AppResources.Posts, AppResources.Pages] 
      },
      [AppActions.Approve]: { 
        can: [AppResources.Comments] 
      },
      [AppActions.Reject]: { 
        can: [AppResources.Comments] 
      },
    },
    
    // Author - Can create and manage their own content
    [AppRoles.Author]: {
      [AppActions.Create]: { 
        can: [AppResources.Posts, AppResources.Media, AppResources.Comments] 
      },
      [AppActions.Read]: { can: 'all' },
      [AppActions.Update]: { 
        can: [AppResources.Posts, AppResources.Media, AppResources.Profile] 
      },
      [AppActions.Delete]: { 
        can: [AppResources.Media] // Can only delete own media
      },
      [AppActions.Publish]: { 
        can: [AppResources.Posts] 
      },
    },
    
    // Contributor - Can create and edit content, but not publish
    [AppRoles.Contributor]: {
      [AppActions.Create]: { 
        can: [AppResources.Posts, AppResources.Comments] 
      },
      [AppActions.Read]: { can: 'all' },
      [AppActions.Update]: { 
        can: [AppResources.Posts, AppResources.Profile] 
      },
    },
    
    // Viewer - Read-only access
    [AppRoles.Viewer]: {
      [AppActions.Read]: { 
        can: 'all',
        cannot: [AppResources.Settings] // Can't view settings
      },
    },
  },
};

// ============================================
// Step 5: Setup in your App.tsx
// ============================================
/*
import { AuthProvider, RBACProvider } from 'izen-react-starter';
import { rbacConfig } from './config/rbac';

function App() {
  return (
    <AuthProvider>
      <RBACProvider config={rbacConfig}>
        <YourApp />
      </RBACProvider>
    </AuthProvider>
  );
}
*/

// ============================================
// Step 6: Usage in components
// ============================================
/*
import { useAccessControl, AccessControlWrapper } from 'izen-react-starter';
import { AppResources, AppActions } from './config/rbac';

function PostEditor() {
  const { isAllowed } = useAccessControl();

  const handlePublish = () => {
    if (isAllowed(AppActions.Publish, AppResources.Posts)) {
      // Publish the post
    } else {
      alert('You do not have permission to publish posts');
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      
      {isAllowed(AppActions.Update, AppResources.Posts) && (
        <button>Save Changes</button>
      )}
      
      <AccessControlWrapper 
        resource={AppResources.Posts} 
        action={AppActions.Publish}
      >
        <button onClick={handlePublish}>Publish</button>
      </AccessControlWrapper>
      
      <AccessControlWrapper 
        resource={AppResources.Posts} 
        action={AppActions.Delete}
        fallback={<p>You cannot delete this post</p>}
      >
        <button>Delete Post</button>
      </AccessControlWrapper>
    </div>
  );
}
*/

// ============================================
// Notes:
// ============================================
// 1. User object from AuthProvider should have a 'role' field:
//    - Single role: { role: 'admin' }
//    - Multiple roles: { role: ['admin', 'editor'] }
//
// 2. The RBACProvider must be inside the AuthProvider
//
// 3. You can check permissions by URL using getResourceByUrl():
//    const { getResourceByUrl } = useAccessControl();
//    const resource = getResourceByUrl('/posts/123');
//
// 4. For complex permissions, use 'cannot' to explicitly deny:
//    { can: 'all', cannot: ['sensitive-resource'] }
//
// 5. CommonActions provides: manage, create, read, update, delete
//    But you can define custom actions as needed
