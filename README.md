\# MERN Application with Nginx and Docker



\## Project Overview

This project demonstrates a Dockerized MERN-style web application using React for the frontend, Node.js and Express for the backend, MongoDB for data storage, and Nginx as a reverse proxy.



The application provides a dashboard where users can add and view items. Docker Compose manages the application's services.



\## Technologies Used

\- \*\*Frontend:\*\* React, Vite

\- \*\*Backend:\*\* Node.js, Express.js

\- \*\*Database:\*\* MongoDB

\- \*\*Reverse Proxy:\*\* Nginx

\- \*\*Containerization:\*\* Docker and Docker Compose



\## Architecture



```text

User Browser

&#x20;    |

&#x20;    v

Nginx (Port 8080)

&#x20;    |

&#x20;    +----> React Frontend

&#x20;    |

&#x20;    +----> Express Backend (Port 5000)

&#x20;                   |

&#x20;                   v

&#x20;                MongoDB

```



\## Project Structure



```text

mern-nginx/

├── backend/

│   ├── models/

│   │   └── Item.js

│   ├── Dockerfile

│   ├── package.json

│   └── server.js

├── frontend/

│   ├── src/

│   ├── Dockerfile

│   └── package.json

├── nginx/

│   └── default.conf

├── .dockerignore

├── .gitignore

└── docker-compose.yml

```



\## Prerequisites

Install the following:

\- Docker Desktop

\- Git

\- A modern web browser



\## How to Run



1\. Clone the repository:



&#x20;  ```bash

&#x20;  git clone https://github.com/Anusha7125/mern-nginx.git

&#x20;  ```



2\. Open the project directory:



&#x20;  ```bash

&#x20;  cd mern-nginx

&#x20;  ```



3\. Build and start the application:



&#x20;  ```bash

&#x20;  docker compose up -d --build

&#x20;  ```



4\. Open the application in your browser:



&#x20;  \*\*Frontend:\*\* http://localhost:8080



\## API Endpoints



| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/health` | Checks backend health |

| GET | `/api/items` | Retrieves items from MongoDB |

| POST | `/api/items` | Adds a new item |



\## Verification



The following checks were performed locally:

\- React dashboard loaded successfully through Nginx.

\- Backend health endpoint returned a healthy status.

\- Items could be added and retrieved through the application.

\- MongoDB data persisted after restarting the Docker services.



\## Stop the Application



Run this command from the project directory:



```bash

docker compose down

```



To remove the database volume as well, use:



```bash

docker compose down -v

```



\*\*Warning:\*\* The second command deletes the persistent MongoDB data volume.



\## Repository



GitHub: https://github.com/Anusha7125/mern-nginx

