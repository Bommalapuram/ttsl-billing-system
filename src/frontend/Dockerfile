FROM node:18-alpine
WORKDIR /app
# package.json అవసరం లేకుండా నేరుగా ఎక్స్‌ప్రెస్ మరియు యాక్సియోస్ ఇన్‌స్టాల్ చేయడం
RUN npm install express axios
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
