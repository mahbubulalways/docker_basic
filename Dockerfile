FROM  node:20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# VOLUME [ "/app/logs" ]

EXPOSE 5000

CMD ["npm", "run", "dev"]



# docker run -p 5000:5000 --name ts-container -v ts-logs://app/logs -w "//${pwd}"://app -v //app/node_modules --rm dockerimage:v1

# docker run -p 5000:5000 --name ts-container -v ts-logs://app/logs -w "//${pwd}"://app -v //app/node_modules --rm --env-file:./.env dockerimage:v1