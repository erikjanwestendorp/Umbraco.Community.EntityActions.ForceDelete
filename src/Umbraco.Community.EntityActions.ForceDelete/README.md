# Force Delete Entity Action for Umbraco

Add a **Force Delete** action to the Umbraco backoffice, allowing developers and editors to permanently remove documents.

---

## Why this package?

In Umbraco, deleting documents intentionally protected by built-in validation rules.

Sometimes however, during development, migrations, testing, or cleanup scenarios, you may run into situations where an item cannot be deleted through the standard backoffice actions.

This package adds an additional **Force Delete** entity action that bypasses standard delete restrictions and allows permanent removal directly from the backoffice.

Perfect for situations like:

* Cleaning up broken documents
* Removing documents stuck because of invalid references
* Development and testing environments
* Debugging content migrations
* Administrative maintenance tasks

---

## Features

✔ Adds a **Force Delete** action to entity menus
✔ Integrates directly into the Umbraco backoffice context menu
✔ Built using the new Entity Actions extension API
✔ Lightweight package with minimal configuration
✔ Supports modern Umbraco backoffice architecture
✔ Community maintained and open source

---

## Installation

Install via NuGet:

```bash
dotnet add package Umbraco.Community.EntityActions.ForceDelete
```

Or install directly from NuGet:

[NuGet Package Page](https://www.nuget.org/packages/Umbraco.Community.EntityActions.ForceDelete?utm_source=chatgpt.com)

---

## How it works

After installation, supported entities in the backoffice will receive an additional action in the context menu.

Example:

```text
Document
 ├─ Create
 ├─ Trash
 ├─ Move to
 ├─ Publish
 └─ Force Delete   ← Added by this package
```

Selecting **Force Delete** will bypass the default delete restrictions and permanently remove the selected entity.

**Note:** The **Force Delete** action is only visible for users whose user group has the **Force Delete** permission enabled under **Document Permissions**.

---

## Important notice

⚠ **Use with caution**

Force deleting bypasses the default safeguards provided by Umbraco.

Improper use may lead to:

* Broken references
* Lost content relationships
* Inconsistent data structures

It is recommended for:

* Developers
* Administrators
* Advanced Umbraco users

Avoid using this package in scenarios where content integrity is business critical.

---

## Requirements

* Umbraco CMS 17+
* .NET 10+

---