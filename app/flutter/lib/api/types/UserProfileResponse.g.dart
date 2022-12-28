// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'UserProfileResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserProfileResponse _$UserProfileResponseFromJson(Map<String, dynamic> json) =>
    UserProfileResponse(
      sym_key: json['sym_key'] as String?,
      profile_picture: json['profile_picture'] as String?,
      first_name: json['first_name'] as String?,
      last_name: json['last_name'] as String?,
    );

Map<String, dynamic> _$UserProfileResponseToJson(
        UserProfileResponse instance) =>
    <String, dynamic>{
      'sym_key': instance.sym_key,
      'profile_picture': instance.profile_picture,
      'first_name': instance.first_name,
      'last_name': instance.last_name,
    };
