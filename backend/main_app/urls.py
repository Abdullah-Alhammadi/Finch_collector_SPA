from django.urls import path
from .views import Home, Finches, FinchDetail, FeedingsIndex, ToyDetail, ToyIndex, AddToyToFinch, RemoveToyFromFinch, PhotoDetail, CreateUserView, LoginView, VerifyUserView

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('finches/', Finches.as_view(), name='finch-index'),
    path('finches/<int:finch_id>/', FinchDetail.as_view(), name='finch-detail'),
    path('finches/<int:finch_id>/feedings/', FeedingsIndex.as_view(), name='feeding-index'),
    path('toys/', ToyIndex.as_view(), name='toy-index'),
    path('toys/<int:toy_id>/', ToyDetail.as_view(), name='toy-detail'),
    path('finches/<int:finch_id>/associate-toy/<int:toy_id>/', AddToyToFinch.as_view(), name='associate-toy'),
    path('finches/<int:finch_id>/remove-toy/<int:toy_id>/', RemoveToyFromFinch.as_view(), name='remove-toy'),
    path('finches/<int:finch_id>/add-photo/', PhotoDetail.as_view(), name='add-photo'),
    path('users/signup/', CreateUserView.as_view(), name='signup'),
    path('users/login/', LoginView.as_view(), name='login'),
    path('users/token/refresh/', VerifyUserView.as_view(), name='token_refresh'),
]


