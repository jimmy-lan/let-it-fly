# Update the common package across all services
cd paper-cranes || exit
npm install @ly-letitfly/common@latest

cd ../user-info || exit
npm install @ly-letitfly/common@latest

cd ../user-property || exit
npm install @ly-letitfly/common@latest

cd ../user-activities || exit
npm install @ly-letitfly/common@latest

cd ../friends || exit
npm install @ly-letitfly/common@latest

cd ../auth || exit
npm install @ly-letitfly/common@latest
