class Url < ApplicationRecord
    validates :shortcut, :long_url, presence: true
end
