set :user, 'adam'

set :application, "credits"

role :app, "credits.adammiribyan.com"
role :web, "credits.adammiribyan.com"
role :db,  "credits.adammiribyan.com", :primary => true

set :scm, "git"
set :repository,  "git@github.com:adammiribyan/credits.git"
set :deploy_via, :remote_cache

ssh_options[:forward_agent] = true
default_run_options[:pty] = true

set :keep_releases, 10
set :use_sudo, false

set :branch, "master"
set :deploy_to, "/home/#{user}/webapps/#{application}.adammiribyan"

namespace :deploy do
  desc "Restart application"
  task :restart, :roles => :app do
    run "touch #{current_path}/tmp/restart.txt"
  end
end

after "deploy", "deploy:cleanup"