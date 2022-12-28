// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'UserProfilePutRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserProfilePutRequest _$UserProfilePutRequestFromJson(
        Map<String, dynamic> json) =>
    UserProfilePutRequest(
      profile_picture: json['profile_picture'] as String?,
      first_name: json['first_name'] as String?,
      last_name: json['last_name'] as String?,
    );

Map<String, dynamic> _$UserProfilePutRequestToJson(
        UserProfilePutRequest instance) =>
    <String, dynamic>{
      'profile_picture': instance.profile_picture,
      'first_name': instance.first_name,
      'last_name': instance.last_name,
    };
