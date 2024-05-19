---
title: "Dynamic User Properties in Azure Data Factory and Azure Synapse Analytics"
excerpt: "Your guide to dynamic user properties in Azure Data Factory and Azure Synapse Analytics."
last_modified_at: 2024-05-19T19:03:51
classes: wide
header:
  teaser: /assets/images/azure.jpg
categories:
  - blog
tags:
  - tech
---

In [Azure Data Factory](https://docs.microsoft.com/en-us/azure/data-factory/) and [Azure Synapse Analytics](https://docs.microsoft.com/en-us/azure/synapse-analytics/), user properties are metadata fields attached to individual activities. They show up in the monitoring logs whenever a pipeline is run and can be useful for things like debugging and troubleshooting. They look like this.

![UserPropertiesImage](/assets/images/UserProperties.png)

You can put any string you want in the user properties of an activity, including dynamic variable values. However, the syntax for doing so is a bit different than standard [Azure Data Factory expression language](https://docs.microsoft.com/en-us/azure/data-factory/control-flow-expression-language-functions). Here's how to do it.

If you had a pipeline with the variables `ContainerName`, `FolderName` and `FileName`, you could write those values as user properties using the syntax `@{variables('ContainerName')}`, `@{variables('FolderName')}` and `@{variables('FileName')}`.

![PopulatedUserProperties](/assets/images/PopulatedUserProperties.png)

The basic idea, wrap any dynamic value in `@{}` to access it in your User Properties. In our example, the variable values get evaluated at pipeline run time and show up in the monitor logs and in [Azure Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial) for use in more advanced monitoring.

![MonitorTabUserProperties](/assets/images/MonitorTabUserProperties.png)
