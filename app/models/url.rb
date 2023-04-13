class Url < ApplicationRecord
    validates :shortcut, :long_url, presence: true, uniqueness: true
    validates :shortcut, length: {maximum: 7}
    validates :long_url, length: {maximum: 120}
end
