---
Name: <% tp.file.title %>
aliases: 
Website: 
Priority: false
Active: true
Created: <% tp.file.creation_date() %>
---

## Employees
```dataview
LIST
FROM "People" & [[]] and !outgoing([[]])
```

## 