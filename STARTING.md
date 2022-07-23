# How to start in docker
docker build -t nest-backupper . (need a point)

# Run database linked on container
docker run --name teste-postgres -e "POSTGRES_PASSWORD=postgres" -p 5432:5432 -v D:/DRIVE/Backupper/backup-directory-nest/data:/var/lib/postgresql/.data -d postgres

# Creating migration
npm run migration:gen testemigration
generate + 'name'.migration on params
-> change name of migration before run

# Run migration
npm run migration:run 
