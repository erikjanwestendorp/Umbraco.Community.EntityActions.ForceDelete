export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'entityUserPermission',
    alias: 'Umb.Community.ForceDelete.Permission',
    name: 'Force Delete Permission',
    forEntityTypes: ['document'],
    weight: 900,
    meta: {
      verbs: ['Umb.Community.ForceDelete'],
      label: 'Force Delete',
      description: 'Allow user to force delete documents',
      group: 'community',
    },
  },
  {
    type: 'entityAction',
    kind: 'default',
    alias: 'Umb.Community.ForceDelete.Action',
    name: 'Force Delete',
    api: () => import('./force-delete.action.js'),
    forEntityTypes: ['document'],
    meta: {
      label: 'Force Delete',
      icon: 'icon-delete',
    },
    conditions: [
      {
        alias: 'Umb.Condition.UserPermission.Document',
        allOf: ['Umb.Community.ForceDelete'],
      },
    ],
  },
  {
    type: 'localization',
    alias: 'Umb.Community.ForceDelete.Localization.En',
    name: 'English',
    meta: {
      culture: 'en',
    },
    js: () => import('./localization/en.js'),
  },
  {
    type: 'localization',
    alias: 'Umb.Community.ForceDelete.Localization.EnUs',
    name: 'English (US)',
    meta: {
      culture: 'en-US',
    },
    js: () => import('./localization/en.js'),
  },
  {
    type: 'localization',
    alias: 'Umb.Community.ForceDelete.Localization.Nl',
    name: 'Dutch',
    meta: {
      culture: 'nl-NL',
    },
    js: () => import('./localization/nl.js'),
}
];