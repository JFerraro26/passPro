## Project Documentation

Please put any and all documentation for your project in this folder. Other than the documents that are required at the end of week 13, feel free to organize this however your group sees fit.


### Events

| name | type | unique | optional |
| --- | --- | --- | --- |
| event_name | str | no | no |
| event_image | str | no | no |
| event_type | str | no | no |
| date | date | no | no |
| start_time | time | no | no |
| end_time | time | no | no |
| description | str | no | no |
| event_id | str | no | no |
| tickets_sold | int | no | default = 0 |
| max_tickets | int | no | no |
| ticket_price | int | no | no |
| created_by | reference to Account entity | no | no |
| promoted | bool | no | default = false |
| venue | str | no | no |
| city | str | no | no |
| state_id | str | no | no |

### Sales

| name | type | unique | optional |
| --- | --- | --- | --- |
| event | reference to Event entity | no | no |
| quantity | int | no | no |
| sold_to | reference to Account entity | no | no |

### Accounts

| name | type | unique | optional |
| --- | --- | --- | --- |
| username | str | yes | no |
| password | str | no | no |
| avatar_img | str | no | yes |
| email | str | yes | no |
| event_manager | bool | no | default = false |
