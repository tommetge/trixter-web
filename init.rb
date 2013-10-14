require 'rubygems'
require 'bundler/setup'
require 'sinatra'

set :public_folder, 'public'
set :views, 'views'

# Rack configuration
use Rack::Session::Cookie, :secret => 'holy SMOKES this is t3h AWESOME s3cr3tn3ss!!1!'

require File.join(File.dirname(__FILE__), 'app')