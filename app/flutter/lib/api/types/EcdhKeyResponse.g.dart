// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'EcdhKeyResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

EcdhKeyResponse _$EcdhKeyResponseFromJson(Map<String, dynamic> json) =>
    EcdhKeyResponse(
      id: json['id'] as String,
      user_id: json['user_id'] as String,
      public_key: json['public_key'] as String,
      private_key: json['private_key'] as String,
      claimed: json['claimed'] as bool,
    );

Map<String, dynamic> _$EcdhKeyResponseToJson(EcdhKeyResponse instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_id': instance.user_id,
      'public_key': instance.public_key,
      'private_key': instance.private_key,
      'claimed': instance.claimed,
    };
