# CV Site

https://www.coralia-muresan.com

# How to re-build

- Connect to the deploy VM
- Run commands:
  ```
  cd /home/cbadmin/CV
  git pull
  git log
  npm run build
  sudo systemctl restart cv_coralia.service | journalctl -u cv_coralia.service -f
  ```
