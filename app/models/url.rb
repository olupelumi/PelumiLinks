class Url < ApplicationRecord
    validates :shortcut, :long_url, presence: true, uniqueness: true
end
