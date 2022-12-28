// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'WhoamiResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

WhoamiResponse _$WhoamiResponseFromJson(Map<String, dynamic> json) =>
    WhoamiResponse(
      json['user_id'] as String?,
      json['username'] as String?,
      json['email'] as String?,
      json['first_name'] as String?,
      json['last_name'] as String?,
    );

Map<String, dynamic> _$WhoamiResponseToJson(WhoamiResponse instance) =>
    <String, dynamic>{
      'user_id': instance.user_id,
      'username': instance.username,
      'email': instance.email,
      'first_name': instance.first_name,
      'last_name': instance.last_name,
    };
