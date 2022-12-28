// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'EcPairRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

EcPairRequest _$EcPairRequestFromJson(Map<String, dynamic> json) =>
    EcPairRequest(
      json['public_key'] as String,
      json['private_key'] as String,
    );

Map<String, dynamic> _$EcPairRequestToJson(EcPairRequest instance) =>
    <String, dynamic>{
      'public_key': instance.public_key,
      'private_key': instance.private_key,
    };
