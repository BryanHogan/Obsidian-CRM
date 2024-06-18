## Shortcuts
```meta-bind-button
label: Create Note
icon: circle
hidden: true
class: ""
tooltip: ""
id: create-note
style: primary
actions:
  - type: command
    command: quickadd:runQuickAdd

```

```meta-bind-button
label: Open Companies View
icon: ""
hidden: true
class: ""
tooltip: ""
id: open-companies
style: default
actions:
  - type: command
    command: obsidian-projects:show:02aae1c9-b33b-47ad-a393-6c7057c75660
```

```meta-bind-button
label: Open Meetings View
icon: ""
hidden: true
class: ""
tooltip: ""
id: open-meetings
style: default
actions:
  - type: command
    command: obsidian-projects:show:ccaebf28-2d38-4fcb-bd69-2016c3119502
```

```meta-bind-button
label: Open People View
icon: ""
hidden: true
class: ""
tooltip: ""
id: open-people
style: default
actions:
  - type: command
    command: obsidian-projects:show:e5418634-0ac5-4ba8-bdd2-c756ae3fe4c9

```

`BUTTON[create-note]`

`BUTTON[open-people]` ● `BUTTON[open-meetings]` ● `BUTTON[open-companies]`

## Tasks
```dataview
TASK
```

## People
```dataviewjs
const pages = dv.pages('"People"')
const twoWeeksAgo = moment().subtract(14, 'days')

const recentPages = pages.filter(p => moment(p.file.ctime).isAfter(twoWeeksAgo)).length

dv.paragraph(`You have added ${recentPages} people in the last two weeks.</br>These are the last people you have added:`)
```

```dataview
table file.mtime as "Creation Date", company
from "People"
sort file.mtime desc
limit 5
```

```dataviewjs
const pages = dv.pages('"People"')
const companyNames = pages.map(p => p.company).values

const companyCounts = companyNames.reduce((acc, company) => {
    acc[company] = (acc[company] || 0) + 1;
    return acc;
}, {});

const companyLabels = Object.keys(companyCounts);
const companyData = Object.values(companyCounts);

const chartData = {
    type: 'bar',
    data: {
        labels: companyLabels,
        datasets: [{
            label: 'Number of People',
            data: companyData,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
        }]
    }
}

window.renderChart(chartData, this.container)

```

