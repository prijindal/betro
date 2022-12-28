// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'UserEcdhKeyResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserEcdhKeyResponse _$UserEcdhKeyResponseFromJson(Map<String, dynamic> json) =>
    UserEcdhKeyResponse(
      id: json['id'] as String,
      public_key: json['public_key'] as String,
    );

Map<String, dynamic> _$UserEcdhKeyResponseToJson(
        UserEcdhKeyResponse instance) =>
    <String, dynamic>{
      'id': instance.id,
      'public_key': instance.public_key,
    };
