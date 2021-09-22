# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'rubygems'

require 'spec_helper'

ENV['RAILS_ENV'] ||= 'test'
ENV["HEADLESS"] ||= 'true'

#require File.expand_path('../config/environment', __dir__)
require File.expand_path("../../config/environment", __FILE__)

# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?

require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/rails'

### if use database_cleaner gem
	require 'database_cleaner/active_record'
###

# Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
# Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# Checks for pending migrations and applies them before tests are run.
# If you are not using ActiveRecord, you can remove these lines.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
	config.include FactoryBot::Syntax::Methods
	
	config.include Devise::Test::ControllerHelpers, type: :controller
	config.include ControllerHelpers, :type => :controller
	config.include Warden::Test::Helpers
	
  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  
	# config.use_transactional_fixtures = true

  ### if use database_cleaner gem
  config.use_transactional_fixtures = false

  config.before(:suite) do
    if config.use_transactional_fixtures?
      raise(<<-MSG)
        Delete line `config.use_transactional_fixtures = true` from rails_helper.rb
        (or set it to false) to prevent uncommitted transactions being used in
        JavaScript-dependent specs.

        During testing, the app-under-test that the browser driver connects to
        uses a different database connection to the database connection used by
        the spec. The app's database connection would not be able to access
        uncommitted transaction data setup over the spec's database connection.
      MSG
    end
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, type: :feature) do
    # :rack_test driver's Rack app under test shares database connection
    # with the specs, so continue to use transaction strategy for speed.
    driver_shares_db_connection_with_specs = Capybara.current_driver == :rack_test

    unless driver_shares_db_connection_with_specs
      # Driver is probably for an external browser with an app
      # under test that does *not* share a database connection with the
      # specs, so use truncation strategy.
      DatabaseCleaner.strategy = :truncation
    end
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.append_after(:each) do
    DatabaseCleaner.clean
  end
	### end of using database_cleaner
	
	
  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, type: :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")
	
	# This block takes a snapshot of the page you are testing.
	# See capybara docs for more on this.
	# The snapshots are saved by default in tmp/capybara.    
	config.after do |example|
		if example.metadata[:type] == :feature
		save_and_open_screenshot		# save_and_open_page
		end
	end	

	# This block configures Caypbara's driver to use Selenium
	# It makes it use the chrome browser, but can also be configured to user Firefox, etc. 
	
  # Chrome non-headless driver
  Capybara.register_driver :chrome do |app|
    Capybara::Selenium::Driver.new(app, browser: :chrome)
  end

  # Chrome headless driver
  Capybara.register_driver :headless_chrome do |app|
    caps = Selenium::WebDriver::Remote::Capabilities.chrome(loggingPrefs: { browser: 'ALL' })
    opts = Selenium::WebDriver::Chrome::Options.new

    chrome_args = %w[--headless --no-sandbox --disable-gpu --window-size=1920,1080 --remote-debugging-port=9222]
    chrome_args.each { |arg| opts.add_argument(arg) }
    Capybara::Selenium::Driver.new(app, browser: :chrome, options: opts, desired_capabilities: caps)
  end

  # Switch between :chrome / :headless_chrome to see tests run in chrome
  case ENV['HEADLESS']
  when 'true', 1, nil
    Capybara.javascript_driver = :headless_chrome
  else
    Capybara.javascript_driver = :chrome
  end
	Capybara.javascript_driver = :headless_chrome
		
	# Uncomment to use capybara-webkit driver for headless testing
	# Capybara.javascript_driver = :webkit

	# Capybara.run_server = false
	# Capybara.app_host = "https://my-website.mysite.com"
	Capybara.configure do |config|
		config.default_max_wait_time = 10 #seconds
		config.default_driver = :chrome
		# config.always_include_port = true
	end
		
end
