class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    
    if user.is? :admin
      can :manage, :all
      can :obtain_additional_details, Request
    else
      can :create, Request
    end
  end
end
