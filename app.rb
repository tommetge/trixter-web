require 'json'
require 'time'
require 'trixter'

$trix = Trixter.new('/dev/tty.usbserial')
$trix.run

get '/' do
  redirect '/index.html'
end

get '/current' do
  {
    'rpms' => $trix.current_rpms,
    'difficulty' => $trix.current_difficulty
  }.to_json
end
